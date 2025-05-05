const GuideProfile = require('../models/GuideProfile');

// Get guide profile by username (case-insensitive)
const getGuideProfileByUsername = async (req, res) => {
  try {
    const guide = await GuideProfile.findOne({
      username: new RegExp(`^${req.params.username}$`, 'i')
    });

    if (!guide) return res.status(404).json({ message: 'Guide not found' });
    res.json(guide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getGuideProfileByUsername };
