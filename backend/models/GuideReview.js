const mongoose = require('mongoose');

const guideReviewSchema = new mongoose.Schema({
  touristUsername: { type: String, required: true },
  guideUsername: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.model('GuideReview', guideReviewSchema, 'guideReviews');
