const Delivery = require('../models/deliveryModel');

// Get all deliveries
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get delivery by trackingId
exports.getDeliveryByTrackingId = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({ trackingId: req.params.trackingId });
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new delivery
exports.createDelivery = async (req, res) => {
  const { trackingId, orderId, status, location, expectedDelivery } = req.body;

  const newDelivery = new Delivery({
    trackingId,
    orderId,
    status,
    location,
    expectedDelivery,
  });

  try {
    const delivery = await newDelivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update delivery status by trackingId
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const updatedDelivery = await Delivery.findOneAndUpdate(
      { trackingId: req.params.trackingId },
      req.body,
      { new: true }
    );
    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json(updatedDelivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete delivery by trackingId
exports.deleteDelivery = async (req, res) => {
  try {
    const deletedDelivery = await Delivery.findOneAndDelete({ trackingId: req.params.trackingId });
    if (!deletedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json({ message: 'Delivery deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
