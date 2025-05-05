const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider', // You can define this model later
    required: true
  },
  eventName: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // You can store a URL or image path
  capacity: { type: Number, required: true },
  remainingSeats: { type: Number, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true }, // e.g., '2:00 PM'
  date: { type: String, required: true }, // You can use Date type if you want stricter control
  region: { type: String },
  venue: { type: String },
  price: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Mixed'], default: 'Mixed' },
  cityName: { type: String }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
