const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const refundSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;
