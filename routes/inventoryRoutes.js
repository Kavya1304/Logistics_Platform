const express = require('express');
const router = express.Router();

// Static data for inventory
const inventory = [
  {
    productId: 'PROD123',
    productName: 'Product A',
    stock: 100,
    price: 499
  },
  {
    productId: 'PROD124',
    productName: 'Product B',
    stock: 200,
    price: 599
  },
  {
    productId: 'PROD125',
    productName: 'Product C',
    stock: 150,
    price: 299
  },
  {
    productId: 'PROD126',
    productName: 'Product D',
    stock: 50,
    price: 799
  },
  {
    productId: 'PROD127',
    productName: 'Product E',
    stock: 75,
    price: 399
  },
  {
    productId: 'PROD128',
    productName: 'Product F',
    stock: 120,
    price: 249
  },
  {
    productId: 'PROD129',
    productName: 'Product G',
    stock: 90,
    price: 349
  }
];

// Get all inventory items
router.get('/', (req, res) => {
  res.json(inventory);
});

// Get inventory item by productId
router.get('/:productId', (req, res) => {
  const item = inventory.find(i => i.productId === req.params.productId);
  if (!item) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }
  res.json(item);
});

// Add a new inventory item
router.post('/', (req, res) => {
  const { productId, productName, stock } = req.body;

  const newInventoryItem = { productId, productName, stock };
  inventory.push(newInventoryItem);

  res.status(201).json(newInventoryItem);
});

// Update inventory stock by productId
router.put('/:productId', (req, res) => {
  const index = inventory.findIndex(i => i.productId === req.params.productId);
  if (index === -1) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }

  inventory[index] = { ...inventory[index], ...req.body };
  res.json(inventory[index]);
});

// Delete inventory item by productId
router.delete('/:productId', (req, res) => {
  const index = inventory.findIndex(i => i.productId === req.params.productId);
  if (index === -1) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }

  const deletedItem = inventory.splice(index, 1);
  res.json({ message: 'Inventory item deleted successfully', deletedItem });
});

module.exports = router;
