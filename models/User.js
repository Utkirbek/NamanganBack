const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required:  false,
    },
    phone: {
      type: String,
      required: true,
    },
    workplace: {
      type: String,
      required: true,
    },
    extra: {
      type: String,
      required: false,
    },
    salary_percent: {
      type: Number,
      required: true,
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
userSchema.methods.addSalary = function (amount) {
  this.earned_salary += amount/100*this.salary_percent;
  this.save();
};
userSchema.methods.removeSalary = function (amount) {
  this.earned_salary -= amount/100*this.salary_percent;
  this.save();
};
userSchema.methods.getSalary = function () {
  this.earned_salary= 0;
  this.save();
};






const User = mongoose.model('User', userSchema);

module.exports = User;
