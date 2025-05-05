const express = require('express');
const router = express.Router();
const {
  createTour,
  getToursByGuide,
  getTourById,
  getToursByGuideById // ✅ New controller
} = require('../controllers/tourController');

// POST: Create a new tour
router.post('/create', createTour);

// GET: Get tours by guide username (legacy)
router.get('/guide/:username', getToursByGuide);

// ✅ GET: Get tours by guide ID (new and recommended)
router.get('/guide/id/:guideId', getToursByGuideById);

// GET: Get a single tour by ID
router.get('/:id', getTourById);

module.exports = router;

