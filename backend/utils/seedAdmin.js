// Path: backend/utils/seedAdmin.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // ✅ Add this
const Admin = require('../models/Admin');

// Load environment variables
dotenv.config({ path: __dirname + '/../.env' });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in your .env file');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');

    const exists = await Admin.findOne({ username: 'admin' });

    if (!exists) {
      const hashedPassword = await bcrypt.hash('admin123', 10); // ✅ Hashing added here

      await Admin.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword
      });

      console.log('✅ Admin created with hashed password.');
    } else {
      console.log('⚠️ Admin already exists.');
    }

    process.exit();
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
