// Path: backend/models/Admin.js

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true } // Stored as plain text
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
