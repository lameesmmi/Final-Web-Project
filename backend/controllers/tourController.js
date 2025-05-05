const Tour = require('../models/Tour');
const Activity = require('../models/Activity');

// Create a tour (updated to include tourGuideId)
const createTour = async (req, res) => {
  try {
    const {
      tourGuideId,
      tourGuideUsername,
      name,
      date,
      time,
      city,
      location,
      status,
      description,
      eventIds,
      capacity,
      remainingSeats,
      price
    } = req.body;

    if (
      !tourGuideId || !tourGuideUsername || !name || !date || !time ||
      !city || !location || !description || !eventIds || !capacity || !price
    ) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newTour = new Tour({
      tourGuideId,
      tourGuideUsername,
      name,
      date,
      time,
      city,
      location,
      status,
      description,
      eventIds,
      capacity,
      remainingSeats: remainingSeats ?? capacity,
      price
    });

    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating tour.' });
  }
};

// Get tours by guide **username**
const getToursByGuide = async (req, res) => {
  try {
    const { username } = req.params;

    const tours = await Tour.find({
      tourGuideUsername: { $regex: new RegExp(`^${username.trim()}$`, 'i') }
    });

    if (!tours.length) {
      return res.status(404).json({ message: 'No tours found for this guide.' });
    }

    const populatedTours = await Promise.all(
      tours.map(async (tour) => {
        const activities = await Activity.find({ _id: { $in: tour.eventIds } });
        const activityNames = activities.map((a) => a.eventName);
        return {
          ...tour.toObject(),
          activityNames,
        };
      })
    );

    res.status(200).json(populatedTours);
  } catch (err) {
    console.error('❌ Error in getToursByGuide:', err);
    res.status(500).json({ message: 'Server error retrieving tours.' });
  }
};

// Get tours by guide **ID**
const getToursByGuideById = async (req, res) => {
  try {
    const { guideId } = req.params;

    const tours = await Tour.find({ tourGuideId: guideId });

    if (!tours.length) {
      return res.status(404).json({ message: 'No tours found for this guide ID.' });
    }

    const populatedTours = await Promise.all(
      tours.map(async (tour) => {
        const activities = await Activity.find({ _id: { $in: tour.eventIds } });
        const activityNames = activities.map((a) => a.eventName);
        return {
          ...tour.toObject(),
          activityNames,
        };
      })
    );

    res.status(200).json(populatedTours);
  } catch (err) {
    console.error('❌ Error in getToursByGuideById:', err);
    res.status(500).json({ message: 'Server error retrieving tours by ID.' });
  }
};

// Get a single tour by its ID
const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json({ message: 'Server error retrieving tour' });
  }
};

// ✅ EXPORTS
module.exports = {
  createTour,
  getToursByGuide,
  getToursByGuideById,
  getTourById
};
