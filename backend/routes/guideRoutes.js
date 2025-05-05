// Path: backend/routes/guideRoutes.js

const express = require('express');
const router = express.Router();

// Import guide-related controller functions
const {
  createGuide,
  getGuides,
  getEarningYears,
  getMonthlyEarnings,
  getTourStatistics,
  getTopAttendedTours,
  getGuideDashboardReviews, // Correct function from guideController
  updateGuideStatus, 
  deleteGuide
} = require('../controllers/guideController');

// Create a new guide
router.post('/', createGuide);

// Get all guides
router.get('/', getGuides);

// Get available years for guide's earnings
router.get('/earnings-years/:guideId', getEarningYears);

// Get monthly earnings for a specific year
router.get('/earnings-per-month/:guideId/:year', getMonthlyEarnings);

// Get tour statistics for a guide within a date range
router.get('/statistics/:guideId', getTourStatistics);

// Get top 3 attended tours for a guide
router.get('/top-tours/:guideId', getTopAttendedTours);

// Get reviews for a guide
router.get('/reviews/:guideId', getGuideDashboardReviews);

// user management 
router.patch('/:id/status', updateGuideStatus);
router.delete('/:id', deleteGuide);


module.exports = router;
