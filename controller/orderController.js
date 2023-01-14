const Order = require('../models/Order');
const Product = require('../models/Product');
const Admin = require('../models/Admin');
const Payment = require('../models/Payment');
const Loan = require('../models/Loan');
const Kassa = require('../models/Kassa');
const Profit = require('../models/Profit');
const Currency = require('../models/Currency');
const User = require('../models/User');
const Refund = require('../models/Refund');

const createOrder = async (req, res) => {
  try {
    let refund = await Refund.create(req.body);
    let data = req.body;
    data.shop = req.params.shop;
    let payment;
    let loan;
    if (data.hasLoan === false && data.cashTotal !== null) {
      payment = await Payment.create({
        shop: data.shop,
        salesman: data.salesman,
        amount: data.cashTotal,
        paymentMethod: data.paymentMethod,
      });
      data.payment = payment._id;
    }

    if (data.hasLoan === true) {
      loan = await Loan.create({
        shop: data.shop,
        salesman: data.salesman,
        amount: data.loanTotal,
        user: data.user,
        shouldPay: data.shouldPay,
      });
      let user = await User.findById(req.body.user);
      user.plusLoan(loan.amount, loan._id);

      data.loan = loan._id;
    }

    const order = await Order.create(data);
    order.setNext('code', function (err) {
      if (err) console.log('Cannot increment the Code because ', err);
    });

    const profit = await Profit.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(1);
    if (profit) {
    } else {
      res.status(404).send({ message: 'Profit not found!' });
    }

    for (let i = 0; i < order.cart.length; i++) {
      const product = await Product.findById(order.cart[i].product);
      let calculatedProfit;
      if (
        product.sellingCurrency &&
        product.currency &&
        product.originalPrice
      ) {
        const currency = await Currency.findById(product.currency);
        const sellingCurrency = await Currency.findById(
          product.sellingCurrency
        );

        const originalPrice =
          +product.originalPrice * +currency.equalsTo;
        const sellingPrice =
          +product.price * +sellingCurrency.equalsTo;

        calculatedProfit =
          (+sellingPrice - +originalPrice) * order.cart[i].quantity;
      } else if (product.currency && product.originalPrice) {
        const currency = await Currency.findById(product.currency);

        const originalPrice =
          +product.originalPrice * +currency.equalsTo;
        const sellingPrice = +product.price * +currency.equalsTo;

        calculatedProfit =
          (+sellingPrice - +originalPrice) * order.cart[i].quantity;
      } else {
        calculatedProfit = 0;
      }
      product.minusQuantity(order.cart[i].quantity);

      profit[0].addAmount(calculatedProfit);
    }

    const admin = await Admin.findById(data.salesman);
    if (admin) {
      admin.addSalary(order.total);
    } else {
      res.status(404).send({
        message: 'Admin Not Found',
      });
    }
    const kassa = await Kassa.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(1);
    if (kassa) {
      await kassa[0].addAmount(data.cashTotal, data.paymentMethod);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }
    res.send({
      message: 'Order Created Successfully!',
      refund,
      calculatedProfit,
      data,
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
    let Orders = [];
    const limit = parseInt(size);
    const AllOrders = await Order.find({ shop: req.params.shop });
    const orders = await Order.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .populate('salesman')
      .populate('shop')
      .populate('cart.product')
      .limit(limit)
      .skip((page - 1) * limit);

    for (let i = 0; i < orders.length; i++) {
      let id;
      if (orders[i].user) {
        id = orders[i].user;
      } else {
        id = '63b1e0cf926152003394c9c2';
      }

      const user = await User.findById(id);

      orders[i].user = user;
    }
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

const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  const profit = await Profit.find({ shop: req.params.shop })
    .sort({ _id: -1 })
    .limit(1);
  if (profit) {
  } else {
    res.status(404).send({ message: 'Kassa not found!' });
  }

  for (let i = 0; i < order.cart.length; i++) {
    const product = await Product.findById(order.cart[i].product);

    if (
      product.sellingCurrency &&
      product.currency &&
      product.originalPrice
    ) {
      const currency = await Currency.findById(product.currency);
      const sellingCurrency = await Currency.findById(
        product.sellingCurrency
      );

      const originalPrice =
        +product.originalPrice * +currency.equalsTo;
      const sellingPrice = +product.price * +sellingCurrency.equalsTo;

      calculatedProfit =
        (+sellingPrice - +originalPrice) * order.cart[i].quantity;
    } else if (product.currency && product.originalPrice) {
      const currency = await Currency.findById(product.currency);

      const originalPrice =
        +product.originalPrice * +currency.equalsTo;
      const sellingPrice = +product.price * +currency.equalsTo;

      calculatedProfit =
        (+sellingPrice - +originalPrice) * order.cart[i].quantity;
    } else {
      calculatedProfit = 0;
    }
    product.plusQuantity(order.cart[i].quantity);

    profit[0].minusAmount(calculatedProfit);
  }
  const admin = await Admin.findById(order.salesman);
  if (admin) {
    admin.removeSalary(order.total);
  } else {
    res.status(404).send({
      message: 'Admin Not Found',
    });
  }
  const kassa = await Kassa.find({ shop: req.params.shop })
    .sort({ _id: -1 })
    .limit(1);
  if (kassa) {
    await kassa[0].minusAmount(order.cashTotal, order.paymentMethod);
  } else {
    res.status(404).send({ message: 'Kassa not found!' });
  }
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
    const profit = await Profit.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(1);

    for (let i = 0; i < order.cart.length; i++) {
      const product = await Product.findById(order.cart[i].product);

      if (
        product.sellingCurrency &&
        product.currency &&
        product.originalPrice
      ) {
        const currency = await Currency.findById(product.currency);
        const sellingCurrency = await Currency.findById(
          product.sellingCurrency
        );

        const originalPrice =
          +product.originalPrice * +currency.equalsTo;
        const sellingPrice =
          +product.price * +sellingCurrency.equalsTo;

        calculatedProfit =
          (+sellingPrice - +originalPrice) * order.cart[i].quantity -
          req.body.cart[i].quantity;
      } else if (product.currency && product.originalPrice) {
        const currency = await Currency.findById(product.currency);

        const originalPrice =
          +product.originalPrice * +currency.equalsTo;
        const sellingPrice = +product.price * +currency.equalsTo;

        calculatedProfit =
          (+sellingPrice - +originalPrice) * order.cart[i].quantity -
          req.body.cart[i].quantity;
      } else {
        calculatedProfit = 0;
      }
      const needToBeRemovedAmount =
        order.cashTotal - req.body.cashTotal;
      product.plusQuantity(req.body.cart[i].quantity);

      if (profit) {
        profit[0].minusAmount(calculatedProfit);
      } else {
        res.status(404).send({ message: 'Profit not found!' });
      }
    }
    const needToBeRemovedAmount =
      order.cashTotal - req.body.cashTotal;
    const admin = await Admin.findById(order.salesman);
    if (admin) {
      admin.removeSalary(needToBeRemovedAmount);
    } else {
      res.status(404).send({
        message: 'Admin Not Found',
      });
    }

    const kassa = await Kassa.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(1);
    if (kassa) {
      await kassa[0].minusAmount(needToBeRemovedAmount);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }
    data = req.body;
    for (let i = 0; i < data.cart.length; i++) {
      if (data.cart[i].product === order.cart[i].product) {
        data.cart[i].quantity =
          order.cart[i].quantity - req.body.cart[i].quantity;
      }
    }
    data.total = order.total - req.body.total;
    data.cashTotal = order.cashTotal - req.body.cashTotal;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      data
    );
    res.status(200).send({
      updatedOrder,
      message: 'Order Updated Successfully!',
    });
  } catch (err) {
    res.status(404).send({ message: 'Order not found!' });
  }
};

const searchOrder = async (req, res) => {
  try {
    const search = req.params.title.toString();
    const orders = await Order.find({
      shop: req.params.shop,
      code: search,
    })
      .sort({ _id: -1 })
      .populate('salesman')
      .populate('shop')
      .populate('cart.product');

    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  deleteOrder,
  createOrder,
  updateOrder,
  searchOrder,
};
