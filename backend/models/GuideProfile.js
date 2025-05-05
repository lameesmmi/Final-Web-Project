const mongoose = require('mongoose');

const guideProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bio: { type: String },
  city: { type: String },
  image: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String }
});

module.exports = mongoose.model('GuideProfile', guideProfileSchema, 'guideProfiles');
