const mongoose = require('mongoose');

const defectSchema = new mongoose.Schema({
  defect_type: String,
});

const detectionSchema = new mongoose.Schema({
  defects: [defectSchema],
  // other detection fields if any
});

const resultSchema = new mongoose.Schema({
  filename: String,
  detections: [detectionSchema],
  // other fields from your results if any
});

const orderSchema = new mongoose.Schema({
  nomEntreprise: String,
  idCommande: String,
  dateImpression: Date,
  agent: String,
  results: [resultSchema],
  validated: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
