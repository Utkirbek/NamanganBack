const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    paid: [
      {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      }
    ],
    left: {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },

    }

  },
  {
    timestamps: true,
  }
);

paymentSchema.methods.addPayment = async function (amount) {
  this.paid.push({ amount });
  this.left.amount -= amount;
  await this.save();
};

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
