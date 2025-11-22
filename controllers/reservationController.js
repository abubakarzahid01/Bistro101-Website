const Reservation = require('../models/Reservation');

// Create new reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Table reservation created successfully',
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating reservation',
      error: error.message
    });
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reservations',
      error: error.message
    });
  }
};

// Get single reservation
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reservation',
      error: error.message
    });
  }
};

// Update reservation status
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation status updated successfully',
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating reservation status',
      error: error.message
    });
  }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting reservation',
      error: error.message
    });
  }
};

// UPDATE ONLY STATUS
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found"
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data: updated
    });

  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating status"
    });
  }
};
