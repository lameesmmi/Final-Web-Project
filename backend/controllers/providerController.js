// Path: backend/controllers/providerController.js

const Provider = require('../models/Provider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Added for token generation

// @desc    Create a new provider with hashed password and return JWT
const createProvider = async (req, res) => {
  try {
    const { companyName, email, password, maaroofNumber, phoneNumber } = req.body;

    // Validate required fields
    if (!companyName || !email || !password || !maaroofNumber || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create provider document in DB
    const provider = await Provider.create({
      companyName,
      email,
      password: hashedPassword,
      maaroofNumber,
      phoneNumber
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: provider._id },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '3d' }
    );

    // Respond with provider info and token
    res.status(201).json({
      message: 'Provider account created successfully',
      token,
      provider: {
        id: provider._id,
        companyName: provider.companyName,
        email: provider.email,
        phoneNumber: provider.phoneNumber
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all providers
const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProviderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const provider = await Provider.findByIdAndUpdate(id, { status }, { new: true });
    if (!provider) return res.status(404).json({ message: 'Provider not found' });

    res.status(200).json(provider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Provider not found' });

    res.status(200).json({ message: 'Provider deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { deleteProvider, updateProviderStatus, createProvider, getProviders };
