const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    originalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Currency',
    },
    discounts: [
      {
        price:{
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      }
    ],
  },

  {
    timestamps: true,
  }
);

productSchema.methods.minusQuantity = function (amount) {
  this.quantity -= amount;
  this.save();
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
