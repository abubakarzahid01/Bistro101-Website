const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

// GET /api/menu - Get all menu items
router.get('/', getAllMenuItems);

// GET /api/menu/:id - Get single menu item
router.get('/:id', getMenuItem);

// POST /api/menu - Create new menu item
router.post('/', createMenuItem);

// PUT /api/menu/:id - Update menu item
router.put('/:id', updateMenuItem);

// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', deleteMenuItem);

module.exports = router;