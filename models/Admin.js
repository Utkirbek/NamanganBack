const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    salary_percent: {
      type: Number,
      default: 0,
    },
    earned_salary: {
      type: Number,
      default: 0,
    },
    orders: [],
    salary_record: [
      {
        amount: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.addSalary = function (amount) {
  this.earned_salary += (amount / 100) * this.salary_percent;

  this.save();
};
adminSchema.methods.removeSalary = function (amount) {
  this.earned_salary -= (amount / 100) * this.salary_percent;
  this.save();
};
adminSchema.methods.getSalary = function (amount) {
  this.salary_record.push({
    amount: amount,
    date: Date.now(),
  });
  this.earned_salary -= amount;
  this.save();
};

const Admin =
  mongoose.models.Admin || mongoose.model('Admin', adminSchema);

module.exports = Admin;
