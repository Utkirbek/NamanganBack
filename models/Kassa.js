const mongoose = require('mongoose');

const kassaSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Kassa = mongoose.model('Kassa', kassaSchema);

module.exports = Kassa;
