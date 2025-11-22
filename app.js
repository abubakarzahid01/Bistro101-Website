const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

// Initialize Express App
const app = express();

// CORS Configuration - Allow your frontend to connect
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body Parser Middleware - To read JSON data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API Routes FIRST (before static files)
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Serve Static Files (Frontend Website)
app.use(express.static('public'));

// Welcome Route - Test if server is running
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Restaurant Management API 🚀',
    status: 'Server is running fine ✅',
    endpoints: {
      auth: '/api/auth',
      menu: '/api/menu',
      orders: '/api/orders',
      reservations: '/api/reservations',
    },
  });
});

// 404 Handler - When route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Export app for server.js to use
module.exports = app;
