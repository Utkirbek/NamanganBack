const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    salesman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    cart:[
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
        },
      },
      
    ],

    total: {
      type: Number,
      required: true,
    },
    paid: [
      {
      amount:{
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      }
    }
    ],
    left:{
      amount:{
        type: Number,
        required: false
      },
      date:{
        type: Date,
        required: false
      }
    },
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
