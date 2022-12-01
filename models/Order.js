const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: 'User',
      default: '',
    },
    salesman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
        },
        unit: {
          type: String,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
    },
    cashTotal: {
      type: Number,

      required: false,
    },
    laonTotal: {
      type: Number,
      required: false,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Loan',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
