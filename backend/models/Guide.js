// Path: backend/models/Guide.js

const mongoose = require('mongoose');

// Guide schema for storing account information related to tour guides
const guideSchema = new mongoose.Schema({
  username:     { type: String, required: true, unique: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true }, // plain text for now (no hashing implemented)
  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  nationalId:   { type: String, required: true },
  phoneNumber:  { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }  
});

// Export the Guide model to be used in routes/controllers
const Guide = mongoose.model('Guide', guideSchema);
module.exports = Guide;
