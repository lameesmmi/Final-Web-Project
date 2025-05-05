const express = require('express');
const router = express.Router();
const { getCityByName } = require('../controllers/cityController');

// Use controller here
router.get('/:name', getCityByName);

module.exports = router;
