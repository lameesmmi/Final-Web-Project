const express = require('express');
const router = express.Router();
const GuideReview = require('../models/GuideReview');

router.get('/:username', async (req, res) => {
  try {
    const reviews = await GuideReview.find({ guideUsername: req.params.username });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
