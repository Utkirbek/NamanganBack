const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: '63b1e0cf926152003394c9c2',
    },
    code: {
      type: Number,
    },
    salesman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: false,
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
      required: false,
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
orderSchema.plugin(AutoIncrement, {
  inc_field: 'code',
  disable_hooks: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
