const orderService = require('../services/orderService'); 

const Order = require('../models/order'); // <-- THIS LINE IS CRITICAL

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};


exports.saveOrderController = async (req, res) => {
  try {
    const savedOrder = await orderService.saveOrder(req.body);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save order' });
  }
};