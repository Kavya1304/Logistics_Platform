const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  estimatedDelivery: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
