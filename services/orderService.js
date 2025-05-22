const Order = require('../models/order');  // your mongoose model or similar

exports.saveOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};
