const express = require('express');
const router = express.Router();
const PendingActivity = require('../models/PendingActivity');

// GET all pending activities
router.get('/', async (req, res) => {
  try {
    const activities = await PendingActivity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending activities' });
  }
});

// POST update action (approve/reject)
router.post('/:id/action', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const updatedActivity = await PendingActivity.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity status' });
  }
});

module.exports = router;