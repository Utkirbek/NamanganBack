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
      type: String,
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

  },
  {
    timestamps: true,
  }
);

adminSchema.methods.addSalary = function (amount) {
  this.earned_salary =  this.earned_salary +  +(amount)/100* this.salary_percent;
  this.save();
};
adminSchema.methods.removeSalary = function (amount) {
  this.earned_salary -= amount/100*this.salary_percent;
  this.save();
};
adminSchema.methods.getSalary = function () {
  this.earned_salary= 0;
  this.save();
};

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

module.exports = Admin;
