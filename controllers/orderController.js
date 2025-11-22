const Order = require('../models/Order');


// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { customerName, email, phone, items, totalAmount, deliveryAddress, paymentMethod } = req.body;

    const newOrder = new Order({
      customerName,
      email,
      phone,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      status: "Pending"
    });

    await newOrder.save();

    res.status(201).json({ success: true, order: newOrder });

  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};



// GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.json({ success: false });
  }
};



// GET SINGLE ORDER
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json({ success: true, order });
  } catch (err) {
    res.json({ success: false });
  }
};



// UPDATE ONLY STATUS (Dropdown)
const updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({ success: true, order: updated });

  } catch (err) {
    res.json({ success: false });
  }
};



// FULL UPDATE (Edit Modal)
const updateOrder = async (req, res) => {
  try {
    const allowed = ["customerName", "phone", "totalAmount", "paymentMethod", "status"];
    const updateFields = {};

    allowed.forEach(field => {
      if (req.body[field] !== undefined) updateFields[field] = req.body[field];
    });

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order: updatedOrder });

  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating order" });
  }
};



// DELETE ORDER
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
};



// FINAL EXPORT
module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder
};
