const Order = require('../models/orderModel');

// Controller functions (similar to routes but more abstract)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const { orderId, status, location, estimatedDelivery } = req.body;
  const newOrder = new Order({
    orderId,
    status,
    location,
    estimatedDelivery,
  });

  try {
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
