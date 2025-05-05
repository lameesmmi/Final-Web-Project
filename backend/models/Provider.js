// Path: backend/models/Provider.js

const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  companyName:   { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true }, // Stored as plain text
  maaroofNumber: { type: String, required: true },
  phoneNumber:   { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }  
});

const Provider = mongoose.model('Provider', providerSchema);
module.exports = Provider;
