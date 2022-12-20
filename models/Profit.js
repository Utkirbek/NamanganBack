const mongoose = require('mongoose');

const profitSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

profitSchema.methods.addAmount = function (amount) {
  this.amount = +this.amount + +amount;
  this.save();
};

profitSchema.methods.minusAmount = function (amount) {
  this.amount = +this.amount - +amount;
  this.save();
};
const Profit = mongoose.model('Profit', profitSchema);

module.exports = Profit;
