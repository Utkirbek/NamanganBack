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

  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
