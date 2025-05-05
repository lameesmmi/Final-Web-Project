const ProviderProfile = require('../models/ProviderProfile');

// @desc    Get provider profile
const getProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({});
    if (!profile) return res.status(404).json({ message: 'No profile found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create provider profile
const createProfile = async (req, res) => {
  try {
    const profile = new ProviderProfile(req.body);
    const saved = await profile.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ @desc    Update provider profile (important one!)
const updateProfile = async (req, res) => {
  try {
    const updated = await ProviderProfile.findOneAndUpdate(
      {}, // matches the first document
      req.body, // new values
      { new: true, upsert: true } // upsert = create if not found
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile
};
