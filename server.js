const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

// Get PORT from environment or use 5000
const PORT = process.env.PORT || 5000;

// Database Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' MongoDB Connected Successfully');
  } catch (error) {
    console.error(' MongoDB Connection Error:', error.message);
    process.exit(1); // Exit if database connection fails
  }
};

// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);

  // 🚀 IMPORTANT: Don't log localhost in production (Render)
  if (process.env.NODE_ENV === 'development') {
    console.log(` Admin Panel: http://localhost:${PORT}/admin`);
  }

  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
});
