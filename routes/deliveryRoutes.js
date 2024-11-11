const express = require('express');
const router = express.Router();

// Static data for deliveries
const deliveries = [
  {
    trackingId: 'TRACK123',
    orderId: 'ORDER123',
    status: 'Shipped',
    location: 'New York',
    expectedDelivery: '2024-11-15T00:00:00.000Z'
  },
  {
    trackingId: 'TRACK124',
    orderId: 'ORDER124',
    status: 'In Transit',
    location: 'Los Angeles',
    expectedDelivery: '2024-11-17T00:00:00.000Z'
  },
  {
    trackingId: 'TRACK125',
    orderId: 'ORDER125',
    status: 'Delivered',
    location: 'Chicago',
    expectedDelivery: '2024-11-10T00:00:00.000Z'
  },
  {
    trackingId: 'TRACK126',
    orderId: 'ORDER126',
    status: 'Pending',
    location: 'Houston',
    expectedDelivery: '2024-11-20T00:00:00.000Z'
  },
  {
    trackingId: 'TRACK127',
    orderId: 'ORDER128',
    status: 'Shipped',
    location: 'Seattle',
    expectedDelivery: '2024-11-18T00:00:00.000Z'
  }
];

// Get all deliveries
router.get('/', (req, res) => {
  res.json(deliveries);
});

// Get delivery by trackingId
router.get('/:trackingId', (req, res) => {
  const delivery = deliveries.find(d => d.trackingId === req.params.trackingId);
  if (!delivery) {
    return res.status(404).json({ message: 'Delivery not found' });
  }
  res.json(delivery);
});

// Create a new delivery
router.post('/', (req, res) => {
  const { trackingId, orderId, status, location, expectedDelivery } = req.body;

  const newDelivery = { trackingId, orderId, status, location, expectedDelivery };
  deliveries.push(newDelivery);

  res.status(201).json(newDelivery);
});

// Update delivery status by trackingId
router.put('/:trackingId', (req, res) => {
  const index = deliveries.findIndex(d => d.trackingId === req.params.trackingId);
  if (index === -1) {
    return res.status(404).json({ message: 'Delivery not found' });
  }

  deliveries[index] = { ...deliveries[index], ...req.body };
  res.json(deliveries[index]);
});

// Delete delivery by trackingId
router.delete('/:trackingId', (req, res) => {
  const index = deliveries.findIndex(d => d.trackingId === req.params.trackingId);
  if (index === -1) {
    return res.status(404).json({ message: 'Delivery not found' });
  }

  const deletedDelivery = deliveries.splice(index, 1);
  res.json({ message: 'Delivery deleted successfully', deletedDelivery });
});

module.exports = router;
