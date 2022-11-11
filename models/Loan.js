const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
  {
    salesman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    shouldPay: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["never", "some", "done"],
      default: "never",
    },
  },
  {
    timestamps: true,
  }
); 

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
