const mongoose = require('mongoose');

const spendSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: false,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    spendType: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Spend = mongoose.model('Spend', spendSchema);

module.exports = Spend;
