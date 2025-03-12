const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  nomEntreprise: { type: String, required: true },
  idCommande: { type: String, required: true },
  nomAgent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
