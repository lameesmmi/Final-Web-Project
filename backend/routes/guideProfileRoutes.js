const express = require('express');
const router = express.Router();
const { getGuideProfileByUsername } = require('../controllers/guideProfileController');
const GuideProfile = require('../models/GuideProfile');

// GET all guide profiles
router.get('/', async (req, res) => {
  console.log("✅ /api/guideProfile route HIT");
  try {
    const guides = await GuideProfile.find();
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET guide by username
router.get('/:username', getGuideProfileByUsername);

module.exports = router;
