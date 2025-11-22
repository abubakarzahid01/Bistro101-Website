const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// POST /api/newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }

    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully!',
      subscriber
    });
  } catch (error) {
    console.error('Newsletter Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/newsletter (for admin panel)
router.get('/', async (req, res) => {
  try {
    const subs = await Newsletter.find().sort({ dateSubscribed: -1 });
    res.json({ success: true, subscribers: subs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching subscribers' });
  }
});

module.exports = router;
