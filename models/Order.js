const mongoose = require('mongoose');

// Define order structure
const orderSchema = new mongoose.Schema({

  
orderNumber: {
  type: Number,
  required: true,
  unique: true,
  default: () => Math.floor(100000 + Math.random() * 900000)   // 6-digit random number
},


  customerName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  // ITEMS MUST MATCH FRONTEND (itemName, NOT name)
  items: [
    {
      itemName: {             
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  deliveryAddress: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Preparing", "Delivered", "Cancelled"],
    default: "Pending"
  },

  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Online"],
    default: "Cash"
  },

  orderDate: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });  // keep timestamps ☑️

module.exports = mongoose.model("Order", orderSchema);
