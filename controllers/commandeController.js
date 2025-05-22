const Commande = require('../models/Commande');

exports.getAllCompared = async (req, res) => {
  try {
    const commande = await Commande.find();
    res.status(200).json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
