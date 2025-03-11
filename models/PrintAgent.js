const mongoose = require("mongoose");

const PrintAgentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PrintAgent", PrintAgentSchema);
