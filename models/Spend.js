const mongoose = require("mongoose");

const spendSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    spendType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Spend = mongoose.model("Spend", spendSchema);

module.exports = Spend;
