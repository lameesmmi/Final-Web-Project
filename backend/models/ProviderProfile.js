const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String
}, { _id: false });

const providerProfileSchema = new mongoose.Schema({
  companyInfo: {
    name: String,
    logo: String,
    overview: String,
    about: String
  },
  contact: {
    email: String,
    phone: String,
    telephone: String
  },
  certifications: [String],
  services: [serviceSchema]
});

module.exports = mongoose.model('ProviderProfile', providerProfileSchema);