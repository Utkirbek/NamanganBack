const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    salesman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
