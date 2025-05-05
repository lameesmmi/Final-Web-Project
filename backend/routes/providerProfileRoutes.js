// Path: backend/routes/providerProfileRoutes.js

const express = require('express');
const router = express.Router();
const {
  getProfile,
  createProfile,
  updateProfile
} = require('../controllers/providerProfileController');

// GET /api/provider-profile
router.get('/', getProfile);

// POST /api/provider-profile
router.post('/', createProfile);

// PUT /api/provider-profile
router.put('/', updateProfile);

module.exports = router;
