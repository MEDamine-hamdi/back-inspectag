const mongoose = require('mongoose');

const compSchema = new mongoose.Schema({
  label_crop_filename: {
    type: String,
    required: true
  },
  similarity_percentage: {
    type: Number,
    required: true
  }
});

const ComparedSchema = new mongoose.Schema({
  nomEntreprise: {
    type: String,
    required: true
  },
  idCommande: {
    type: String,
    required: true,
    unique: true
  },
  dateImpression: {
    type: Date,
    required: true
  },
  agent: {
    type: String,
    required: true
  },
  average_similarity: {
    type: Number,
    required: true
  },
  validé: {
    type: Boolean,
    default: false
  },
  comp: {
    type: [compSchema],
    default: []
  }
}, {
  timestamps: true,
  collection: 'commande'  // 👈 explicitly set collection name
});

module.exports = mongoose.model('Commande', ComparedSchema);
