const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  username: { type: String, required: true },
  reportedUsername: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Reviewed', 'Dismissed'],
    default: 'Pending'
  },
  action: {
    type: String,
    enum: ['Warn reported user', 'Suspend reported user', 'Ban reported user', 'Dismiss'],
    default: 'Dismiss'
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
