// Path: backend/controllers/touristController.js

const Tourist = require('../models/Tourist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc Create a new tourist with validation 
const createTourist = async (req, res) => {
  try {
    const { username, email, password, fullName, phoneNumber } = req.body;

    if (!username || !email || !password || !fullName || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const tourist = await Tourist.create({
      username,
      email,
      password: hashedPassword,
      fullName,
      phoneNumber
    });

    res.status(201).json(tourist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Tourist login
const loginTourist = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const tourist = await Tourist.findOne({ email });
    if (!tourist) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, tourist.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: tourist._id },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '3d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      tourist: {
        id: tourist._id,
        username: tourist.username,
        email: tourist.email,
        fullName: tourist.fullName,
        phoneNumber: tourist.phoneNumber
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all tourists
const getTourists = async (req, res) => {
  try {
    const tourists = await Tourist.find();
    res.status(200).json(tourists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Add an activity to tourist's plan
const addToPlan = async (req, res) => {
  try {
    const { activityId, seats } = req.body;
    const touristId = req.params.id;

    const tourist = await Tourist.findById(touristId);
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });

    tourist.plans.push({
      activity: activityId,
      seats,
      status: 'Confirmed'
    });

    await tourist.save();
    res.status(200).json({ message: 'Activity added to your plan' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get tourist's plan
const getTouristPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const tourist = await Tourist.findById(id).populate('plans.activity');
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    res.status(200).json(tourist.plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Remove activity from plan (by activity ID)
const removeActivityFromPlan = async (req, res) => {
  try {
    const { id, activityId } = req.params;

    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    tourist.plans = tourist.plans.filter(plan =>
      plan.activity.toString() !== activityId
    );

    await tourist.save();
    res.status(200).json({ message: 'Activity removed from plan' });
  } catch (err) {
    console.error("❌ Error removing activity from plan:", err);
    res.status(500).json({ message: 'Server error while removing activity' });
  }
};

// @desc Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { activityId } = req.body;
    const touristId = req.params.id;

    const tourist = await Tourist.findById(touristId);
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });

    if (tourist.wishlist.some(id => id.toString() === activityId)) {
      return res.status(400).json({ message: 'Activity already in wishlist' });
    }

    tourist.wishlist.push(activityId);
    await tourist.save();

    res.status(200).json({ message: 'Activity added to your wishlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { id, activityId } = req.params;

    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    tourist.wishlist = tourist.wishlist.filter(
      (item) => item.toString() !== activityId
    );

    await tourist.save();
    res.status(200).json({ message: 'Activity removed from wishlist' });
  } catch (err) {
    console.error("❌ Error removing activity from wishlist:", err);
    res.status(500).json({ message: 'Server error while removing activity' });
  }
};

// @desc Get wishlist
const getWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const tourist = await Tourist.findById(id).populate('wishlist');
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    res.status(200).json(tourist.wishlist);
  } catch (err) {
    console.error("❌ Error fetching wishlist:", err);
    res.status(500).json({ message: 'Server error while fetching wishlist' });
  }
};

// @desc Update tourist status
const updateTouristStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const tourist = await Tourist.findByIdAndUpdate(id, { status }, { new: true });
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });

    res.status(200).json(tourist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete tourist
const deleteTourist = async (req, res) => {
  try {
    const tourist = await Tourist.findByIdAndDelete(req.params.id);
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });

    res.status(200).json({ message: 'Tourist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createTourist,
  loginTourist,
  getTourists,
  addToPlan,
  getTouristPlan,
  removeActivityFromPlan,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  deleteTourist,
  updateTouristStatus
};
