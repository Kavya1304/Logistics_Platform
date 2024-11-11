const express = require('express');
const router = express.Router();

// Static data for orders
const orders = [
  {
    orderId: 'ORDER123',
    customerName: 'John Doe',
    product: 'Product A',
    quantity: 1,
    status: 'Pending',
    deliveryAddress: '123 Main St, New York, NY',
    orderDate: '2024-11-01T00:00:00.000Z'
  },
  {
    orderId: 'ORDER124',
    customerName: 'Jane Smith',
    product: 'Product B',
    quantity: 2,
    status: 'Shipped',
    deliveryAddress: '456 Elm St, Los Angeles, CA',
    orderDate: '2024-11-05T00:00:00.000Z'
  },
  {
    orderId: 'ORDER125',
    customerName: 'Alice Johnson',
    product: 'Product C',
    quantity: 1,
    status: 'Delivered',
    deliveryAddress: '789 Pine St, Chicago, IL',
    orderDate: '2024-11-02T00:00:00.000Z'
  },
  {
    orderId: 'ORDER126',
    customerName: 'Bob Brown',
    product: 'Product D',
    quantity: 3,
    status: 'Pending',
    deliveryAddress: '321 Oak St, Houston, TX',
    orderDate: '2024-11-03T00:00:00.000Z'
  },
  {
    orderId: 'ORDER127',
    customerName: 'Carol White',
    product: 'Product E',
    quantity: 2,
    status: 'Cancelled',
    deliveryAddress: '654 Maple St, Miami, FL',
    orderDate: '2024-11-04T00:00:00.000Z'
  }
];

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get order by orderId
router.get('/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// Create a new order
router.post('/', (req, res) => {
  const { orderId, customerName, product, quantity, status, deliveryAddress, orderDate } = req.body;

  const newOrder = { orderId, customerName, product, quantity, status, deliveryAddress, orderDate };
  orders.push(newOrder);

  res.status(201).json(newOrder);
});

// Update an order by orderId
router.put('/:orderId', (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.orderId);
  if (index === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }

  orders[index] = { ...orders[index], ...req.body };
  res.json(orders[index]);
});

// Delete an order by orderId
router.delete('/:orderId', (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.orderId);
  if (index === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const deletedOrder = orders.splice(index, 1);
  res.json({ message: 'Order deleted successfully', deletedOrder });
});

module.exports = router;
