const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
