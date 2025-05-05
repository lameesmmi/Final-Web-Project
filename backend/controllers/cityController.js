const City = require('../models/City');

// Controller: Get a city by name
const getCityByName = async (req, res) => {
  try {
    const rawName = req.params.name.trim();
    const city = await City.findOne({
      name: { $regex: `^${rawName}$`, $options: 'i' }
    });

    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json(city);
  } catch (err) {
    console.error("City fetch error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getCityByName };
