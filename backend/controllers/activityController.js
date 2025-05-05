const Activity = require('../models/Activity');

// @desc Get all activities with provider info
const getActivities = async (req, res) => {
    try {
      const { city, date } = req.query;
  
      const query = {};
     
      if (city) query.cityName = { $regex: `^${city.trim()}$`, $options: 'i' };
      
      if (date) query.date = date;
  
      const activities = await Activity.find(query).populate('provider');
      res.status(200).json(activities);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  

// @desc Create a new activity
const createActivity = async (req, res) => {
  try {
    const {
      provider,
      eventName,
      description,
      image,
      capacity,
      remainingSeats,
      location,
      time,
      date,
      region,
      venue,
      price,
      gender,
      cityName
    } = req.body;

    const activity = await Activity.create({
      provider,
      eventName,
      description,
      image,
      capacity,
      remainingSeats,
      location,
      time,
      date,
      region,
      venue,
      price,
      gender,
      cityName
    });

    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getActivityById = async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id).populate('provider');
      if (!activity) return res.status(404).json({ message: 'Activity not found' });
  
      res.status(200).json(activity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getActivitiesByIds = async (req, res) => {
  try {
    const ids = (req.query.ids || '').split(',').filter(Boolean);
    const mongoose = require('mongoose');
    const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));
    const activities = await Activity.find({ _id: { $in: objectIds } });
    res.status(200).json(activities);
  } catch (err) {
    console.error("Error fetching activities by IDs:", err);
    res.status(500).json({ message: 'Failed to fetch activities by IDs' });
  }
};

module.exports = {  getActivityById , getActivities, createActivity, getActivitiesByIds };
