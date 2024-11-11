const Inventory = require('../models/inventoryModel');

// Get all inventory items
exports.getAllInventoryItems = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get inventory item by productId
exports.getInventoryItemByProductId = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findOne({ productId: req.params.productId });
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(inventoryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new inventory item
exports.addInventoryItem = async (req, res) => {
  const { productId, productName, stock } = req.body;

  const newInventoryItem = new Inventory({
    productId,
    productName,
    stock,
  });

  try {
    const inventoryItem = await newInventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update inventory stock by productId
exports.updateInventoryStock = async (req, res) => {
  try {
    const updatedInventory = await Inventory.findOneAndUpdate(
      { productId: req.params.productId },
      req.body,
      { new: true }
    );
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(updatedInventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete inventory item by productId
exports.deleteInventoryItem = async (req, res) => {
  try {
    const deletedInventoryItem = await Inventory.findOneAndDelete({ productId: req.params.productId });
    if (!deletedInventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
