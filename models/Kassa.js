const mongoose = require('mongoose');

const kassaSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Kassa = mongoose.model('Kassa', kassaSchema);

module.exports = Kassa;
