// Path: backend/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/adminController');

// POST /api/admin/login
router.post('/login', loginAdmin);

router.get('/:username', async (req, res) => {
    try {
      const admin = await Admin.findOne({ username: req.params.username });
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
      res.json(admin);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;

module.exports = router;
