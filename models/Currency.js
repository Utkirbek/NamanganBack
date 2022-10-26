const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  equalsTo: {
    type: Number,
    required: true,
  }
});

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;
