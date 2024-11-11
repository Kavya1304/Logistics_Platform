const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
