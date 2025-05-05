const ActivityProviderReservation = require('../models/ActivityProviderReservation');

// GET all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await ActivityProviderReservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new reservation
const createReservation = async (req, res) => {
  try {
    const reservation = new ActivityProviderReservation(req.body);
    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update reservation status (e.g. Paid / Unpaid)
const updateReservationStatus = async (req, res) => {
  try {
    const updated = await ActivityProviderReservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Reservation not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllReservations,
  createReservation,
  updateReservationStatus 
};
