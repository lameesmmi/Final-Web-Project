const express = require('express');
const router = express.Router();

const {
    getActivities,
    createActivity,
    getActivityById,
    getActivitiesByIds // ✅ imported
} = require('../controllers/activityController');

// Make sure this comes FIRST
router.get('/byIds', getActivitiesByIds); // ✅ specific route

// Other routes
router.get('/', getActivities);
router.post('/', createActivity);
router.get('/:id', getActivityById); // ❗ keep this at the bottom



module.exports = router;
