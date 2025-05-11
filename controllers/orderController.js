const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    const { nomEntreprise, idCommande, agent } = req.body;
    const newOrder = new Order({ nomEntreprise, idCommande, agent });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Return orders as a response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCommandeStatus = async (req, res) => {
  try {
    const { nomEntreprise, idCommande, validated } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { nomEntreprise, idCommande },
      { validated },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
