// Path: backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');
const Tourist = require('../models/Tourist');
const Guide = require('../models/Guide');
const Provider = require('../models/Provider');

// ---------------------------------------------
// @desc    Unified login controller for all user roles
// @route   POST /api/auth/login
// ---------------------------------------------
const login = async (req, res) => {
  const { identifier, password } = req.body; // identifier = username or email

  if (!identifier || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Try matching a user and validating password for each role
  const tryMatch = async (Model, fields, role) => {
    const query = fields.map(field => ({ [field]: identifier }));
    const user = await Model.findOne({ $or: query });

    if (!user) return { match: false };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { match: false };

    return { match: true, role, user };
  };

  const checks = [
    await tryMatch(Admin, ['username', 'email'], 'admin'),
    await tryMatch(Tourist, ['username', 'email'], 'tourist'),
    await tryMatch(Guide, ['username', 'email'], 'guide'),
    await tryMatch(Provider, ['email'], 'provider')
  ];

  const result = checks.find(r => r.match);

  if (result) {
    // Generate a token with user ID and role
    const token = jwt.sign(
      { id: result.user._id, role: result.role },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '3d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      role: result.role,
      token,
      [result.role]: {
        id: result.user._id,
        username: result.user.username || result.user.companyName || '',
        email: result.user.email
      }
    });
    
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = { login };
