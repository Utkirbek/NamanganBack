const Order = require('../models/Order');
const Admin = require('../models/Admin');
const Payment = require('../models/Payment');
const Loan = require('../models/Loan');
const Kassa = require('../models/Kassa');

const createOrder = async (req, res) => {
  try {
    const data = req.body;
    let payment;
    let loan;
    if (data.cashTotal > 0) {
      payment = await Payment.create({
        salesman: data.salesman,
        amount: data.cashTotal,
        paymentMethod: data.paymentMethod,
      });
      data.payment = payment._id;
    }
    if (data.hasLoan === 'true') {
      loan = await Loan.create({
        salesman: data.salesman,
        amount: data.loanTotal,
        user: data.user,
        shouldPay: data.shouldPay,
      });
      data.loan = loan._id;
    }

    const order = await Order.create(data);

    const admin = await Admin.findById(data.salesman);
    if (admin) {
      admin.addSalary(order.total);
    } else {
      res.status(404).send({
        message: 'Admin Not Found',
      });
    }
    const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
    if (kassa) {
      await kassa[0].addAmount(data.cashTotal);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }
    res.send({
      message: 'Order Created Successfully!',
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }
    const limit = parseInt(size);
    const AllOrders = await Order.find({});
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate('user')
      .populate('salesman')
      .populate('cart.product')
      .limit(limit)
      .skip((page - 1) * limit);
    res.send({
      orders: orders,
      count: orders.length,
      totalPage: Math.ceil(AllOrders.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).sort({
      _id: -1,
    });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Order Deleted Successfully!',
      });
    }
  });
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (order.salesman !== req.body.salesman) {
        res.send({ message: 'You cannot update this order' });
      } else {
        order.cart = req.body.cart;
        order.total = req.body.total;
        order.payment = req.body.payment;
        order.loan = req.body.loan;
        await spend.save();
        res.send({ message: 'Order Updated Successfully!' });
      }
    }
  } catch (err) {
    res.status(404).send({ message: 'Order not found!' });
  }
};
module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  deleteOrder,
  createOrder,
  updateOrder,
};
