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
    type: Number,
    required: true,
  },
  colors: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
  },
  powerBHP: {
    type: Number,
  },
  maxSpeed: {
    type: Number,
  },
  image: {
    type: String, 
  },
});

productSchema.index({ model: 'text' });

module.exports = mongoose.model('OEM_Spec', productSchema);
