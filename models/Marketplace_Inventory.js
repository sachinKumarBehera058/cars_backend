const mongoose = require('mongoose');

const MarketplaceInventorySchema = new mongoose.Schema({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  dealer: { type: String, required: true }, // Assuming each entry belongs to a dealer
  kmsOnOdometer: { type: Number },
  majorScratches: { type: Boolean },
  originalPaint: { type: Boolean },
  accidentsReported: { type: Number },
  previousBuyers: { type: Number },
  registrationPlace: { type: String },
});

const MarketplaceInventoryModel = mongoose.model('Marketplace_Inventory', MarketplaceInventorySchema);

module.exports = MarketplaceInventoryModel;
