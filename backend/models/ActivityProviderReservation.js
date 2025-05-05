// Path: backend/models/ActivityProviderReservation.js

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  participant: { type: String, required: true },
  status: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ActivityProviderReservation', reservationSchema);
