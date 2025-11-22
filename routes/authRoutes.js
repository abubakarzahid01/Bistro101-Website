const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/authController');


// POST /api/auth/signup - Register new user
router.post('/signup', signup);

// POST /api/auth/login - User login
router.post('/login', login);

// GET /api/auth/users - Get all users (for admin)
router.get('/users', getAllUsers);

// UPDATE user
router.put('/users/:id', updateUser);

// DELETE user
router.delete('/users/:id', deleteUser);


module.exports = router;