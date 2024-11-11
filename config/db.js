const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string from the environment variable
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;