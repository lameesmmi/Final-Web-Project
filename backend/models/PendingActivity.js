const mongoose = require('mongoose');

const pendingActivitySchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, required: true },
  place: { type: String, required: true },
  timestamp: { type: Date, required: true },
  attachmentUrl: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
});

module.exports = mongoose.model('PendingActivity', pendingActivitySchema, 'pendingActivities');