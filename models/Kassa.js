const mongoose = require('mongoose');

const kassaSchema = new mongoose.Schema(
  {
    cash: {
      type: Number,
      required: true,
      default: 0,
    },
    terminal: {
      type: Number,
      required: true,
      default: 0,
    },
    click: {
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

kassaSchema.methods.addAmount = function (amount, type) {
  if (type === 'click') {
    this.click = +this.click + +amount;
  } else if (type === 'terminal') {
    this.terminal = +this.terminal + +amount;
  } else {
    this.cash = +this.cash + +amount;
  }

  this.save();
};

kassaSchema.methods.minusAmount = function (amount, type) {
  if (type === 'click') {
    this.click = +this.click - +amount;
  } else if (type === 'terminal') {
    this.terminal = +this.terminal - +amount;
  } else {
    this.cash = +this.cash - +amount;
  }

  this.save();
};
const Kassa = mongoose.model('Kassa', kassaSchema);

module.exports = Kassa;
