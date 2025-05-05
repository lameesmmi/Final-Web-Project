const mongoose = require('mongoose');
const Tour = require('../models/Tour');
require('dotenv').config();

// TODO: Replace this with a real guideId from your DB
const guideId = '681216f4585c22f5ed2fe904';

const startDate = new Date('2023-01-01');
const endDate = new Date('2025-05-01');

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomPrice() {
  return Math.floor(Math.random() * 600) + 200; // 200–800 SAR
}

async function seedTours() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const tours = [];

    // Add 50 sample tours
    for (let i = 0; i < 50; i++) {
      const tourDate = getRandomDate(startDate, endDate);
      tours.push({
        guideId,
        date: tourDate,
        price: getRandomPrice(),
        title: `Tour #${i + 1}`
      });
    }

    await Tour.insertMany(tours);
    console.log('✅ Successfully seeded 50 tours!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding tours:', err.message);
    process.exit(1);
  }
}

seedTours();
