// Path: backend/routes/activityProviderReservationRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllReservations,
  createReservation,
  updateReservationStatus,
} = require('../controllers/activityProviderReservationController');

// GET all reservations
router.get('/', getAllReservations);

// POST a new reservation
router.post('/', createReservation);

// PUT update status (Paid/Unpaid)
router.put('/:id', updateReservationStatus);

module.exports = router;
