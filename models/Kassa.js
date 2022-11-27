const mongoose = require('mongoose');

const kassaSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

kassaSchema.methods.addAmount = function (amount) {
  this.amount = +this.amount + +amount;
  this.save();
};

kassaSchema.methods.minusAmount = function (amount) {
  this.amount = +this.amount - +amount;
  this.save();
};
const Kassa = mongoose.model('Kassa', kassaSchema);

module.exports = Kassa;
