const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { name, email, review, rating } = req.body;

    if (!name || !email || !review || !rating) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 🟢 Align field names with admin panel
    const newReview = new Review({
      customerName: name,
      email,
      comment: review,
      rating,
      date: new Date()
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully!',
      review: newReview
    });
  } catch (error) {
    console.error('Review Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/reviews (for admin panel)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error('Review Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
});

module.exports = router;
