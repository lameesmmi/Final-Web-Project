const mongoose = require('mongoose');

const touristSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },


  plans: [
    {
      activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
      seats: Number,
      status: { type: String, default: 'Pending' }
    }
  ],

  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },

});

const Tourist = mongoose.model('Tourist', touristSchema);
module.exports = Tourist;
