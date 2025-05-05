// Path: backend/controllers/guideController.js

const Guide = require('../models/Guide');
const Tour = require('../models/Tour');
const GuideDashboardReviews = require('../models/GuideDashboardReviews');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ---------------------------------------------
// @desc    Create a new guide with hashed password and return JWT
// @route   POST /api/guides
// ---------------------------------------------
const createGuide = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, nationalId, phoneNumber } = req.body;

    if (!username || !email || !password || !firstName || !lastName || !nationalId || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const guide = await Guide.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      nationalId,
      phoneNumber
    });

    const token = jwt.sign(
      { id: guide._id },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '3d' }
    );

    res.status(201).json({
      message: 'Guide account created successfully',
      token,
      guide: {
        id: guide._id,
        username: guide.username,
        email: guide.email,
        fullName: `${guide.firstName} ${guide.lastName}`,
        phoneNumber: guide.phoneNumber
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ---------------------------------------------
// @desc    Get reviews for a specific guide
// @route   GET /api/guides/reviews/:guideId
// ---------------------------------------------
const getGuideDashboardReviews = async (req, res) => {
  const { guideId } = req.params;

  try {
    const reviews = await GuideDashboardReviews.find({ guideId }).select('reviewerName stars comment createdAt');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch guide reviews' });
  }
};

// ---------------------------------------------
// @desc    Get top 3 attended tours for a guide
// @route   GET /api/guides/top-tours/:guideId
// ---------------------------------------------
const getTopAttendedTours = async (req, res) => {
  const { guideId } = req.params;

  try {
    const topTours = await Tour.aggregate([
      { $match: { guideId: new mongoose.Types.ObjectId(guideId) } },
      {
        $group: {
          _id: "$title",
          attendees: { $sum: "$attendees" }
        }
      },
      { $sort: { attendees: -1 } },
      { $limit: 3 },
      {
        $project: {
          _id: 0,
          title: "$_id",
          attendees: 1
        }
      }
    ]);

    res.json(topTours);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top attended tours' });
  }
};

// ---------------------------------------------
// @desc    Get all registered guides
// ---------------------------------------------
const getGuides = async (req, res) => {
  try {
    const guides = await Guide.find();
    res.status(200).json(guides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------------------------
// @desc    Get all years where guide has tours
// @route   GET /api/guides/earnings-years/:guideId
// ---------------------------------------------
const getEarningYears = async (req, res) => {
  const { guideId } = req.params;

  try {
    const years = await Tour.aggregate([
      { $match: { guideId: new mongoose.Types.ObjectId(guideId) } },
      { $group: { _id: { $year: "$date" } } },
      { $sort: { "_id": 1 } }
    ]);

    res.json(years.map(y => y._id.toString()));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch years" });
  }
};

// ---------------------------------------------
// @desc    Get monthly earnings for a guide in a year
// @route   GET /api/guides/earnings-per-month/:guideId/:year
// ---------------------------------------------
const getMonthlyEarnings = async (req, res) => {
  const { guideId, year } = req.params;

  try {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${parseInt(year) + 1}-01-01`);

    const result = await Tour.aggregate([
      {
        $match: {
          guideId: new mongoose.Types.ObjectId(guideId),
          date: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$price" }
        }
      }
    ]);

    const earnings = Array(12).fill(0);
    result.forEach(({ _id, total }) => {
      earnings[_id - 1] = total;
    });

    res.json(earnings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch monthly earnings" });
  }
};

// ---------------------------------------------
// @desc    Placeholder for future tour statistics
// @route   GET /api/guides/statistics/:guideId
// ---------------------------------------------
const getTourStatistics = async (req, res) => {
  res.status(501).json({ message: "getTourStatistics not yet implemented" });
};

// @desc    Update guide status (active/inactive)
const updateGuideStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const guide = await Guide.findByIdAndUpdate(id, { status }, { new: true });
    if (!guide) return res.status(404).json({ message: 'Guide not found' });

    res.status(200).json(guide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete guide
const deleteGuide = async (req, res) => {
  console.log("➡️ DELETE guide route hit with ID:", req.params.id);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log("❌ Invalid ID format");
    return res.status(400).json({ message: 'Invalid guide ID' });
  }

  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) {
      console.log("❌ Guide not found");
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.status(200).json({ message: 'Guide deleted successfully' });
  } catch (err) {
    console.error("❌ Error deleting guide:", err);
    res.status(500).json({ message: err.message });
  }
};




module.exports = {
  createGuide,
  getGuides,
  getEarningYears,
  getMonthlyEarnings,
  getTourStatistics,
  getTopAttendedTours,
  getGuideDashboardReviews, // Exported for use in routes
  deleteGuide,
  updateGuideStatus
};
