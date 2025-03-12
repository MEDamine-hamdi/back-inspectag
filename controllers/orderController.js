const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    const { nomEntreprise, idCommande, nomAgent } = req.body;
    const newOrder = new Order({ nomEntreprise, idCommande, nomAgent });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
