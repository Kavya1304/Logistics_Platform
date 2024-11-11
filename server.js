const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Your API routes (orderRoutes.js, deliveryRoutes.js, inventoryRoutes.js)
const orderRoutes = require('./routes/orderRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// API routes
app.use('/api/orders', orderRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/inventory', inventoryRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
