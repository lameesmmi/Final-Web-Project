const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  tourGuideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide',
    required: true
  },
  tourGuideUsername: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Cancelled', 'Completed'],
    default: 'Scheduled'
  },
  description: {
    type: String,
    required: true
  },
  eventIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    }
  ],
  capacity: {
    type: Number,
    required: true
  },
  remainingSeats: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);
