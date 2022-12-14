const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    workplace: {
      type: String,
      required: false,
    },
    extra: {
      type: String,
      required: false,
    },
    loan: {
      type: Number,
      default: 0,
    },
    loanHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
        required: false,
      },
    ],
    paymentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.minusLoan = function (amount) {
  this.loan -= amount;
  this.save();
};
userSchema.methods.plusLoan = function (amount) {
  this.loan += amount;
  this.save();
};
userSchema.methods.addLoanHistory = function (id) {
  this.loanHistory.push(id);
  this.save();
};
userSchema.methods.addPaymentHistory = function (id) {
  this.paymentHistory.push(id);
  this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
