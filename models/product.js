const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  listPrice: {
    type: Number,  // Assuming this is the price field
    required: true,
  },
  colors: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,  // Assuming this is the mileage field
  },
  powerBHP: {
    type: Number,
  },
  maxSpeed: {
    type: Number,
  },
});

productSchema.index({ model: 'text' });

module.exports = mongoose.model('OEM_Spec', productSchema);
