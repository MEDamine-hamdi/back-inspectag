const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  nomEntreprise: { type: String, required: true },
  idCommande: { type: String, required: true },
  agent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  validated: { type: Boolean, default: null }
});

module.exports = mongoose.model("Order", OrderSchema);
