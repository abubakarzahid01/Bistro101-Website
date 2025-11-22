const express = require('express');
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

// CREATE ORDER
router.post('/', createOrder);

// GET ALL ORDERS
router.get('/', getAllOrders);

// GET ONE ORDER
router.get('/:id', getOrder);

// UPDATE FULL ORDER (edit modal)
router.put('/:id', updateOrder);

// UPDATE ONLY STATUS (dropdown)
router.put('/:id/status', updateOrderStatus);

// DELETE ORDER
router.delete('/:id', deleteOrder);

module.exports = router;
