const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

dailySchema.methods.addAmount = function (amount) {
  this.amount = +this.amount + +amount;
  this.save();
};

const Daily = mongoose.model('Daily', dailySchema);

module.exports = Daily;
