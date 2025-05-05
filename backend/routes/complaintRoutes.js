const express = require('express'); 
const router = express.Router();
const Complaint = require('../models/complaints');

// ✅ Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ time: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// ✅ Delete a complaint
router.delete('/:id', async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
});

router.post('/:id/status', async (req, res) => {
    try {
      const updated = await Complaint.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update status' });
    }
  });
  
  // POST update for action
  router.post('/:id/action', async (req, res) => {
    try {
      const updated = await Complaint.findByIdAndUpdate(
        req.params.id,
        { action: req.body.action },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update action' });
    }
  });
  
module.exports = router;