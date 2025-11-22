const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservation,
  updateReservationStatus,
  deleteReservation
} = require('../controllers/reservationController');

// POST /api/reservations - Create new reservation
router.post('/', createReservation);

// GET /api/reservations - Get all reservations
router.get('/', getAllReservations);

// GET /api/reservations/:id - Get single reservation
router.get('/:id', getReservation);

// PUT /api/reservations/:id/status - Update reservation status
router.put('/:id/status', updateReservationStatus);

// DELETE /api/reservations/:id - Delete reservation
router.delete('/:id', deleteReservation);

module.exports = router;