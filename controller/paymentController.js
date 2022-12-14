const Payment = require('../models/Payment');
const Kassa = require('../models/Kassa');
const Loan = require('../models/Loan');
const Admin = require('../models/Admin');
const User = require('../models/User');

const addPayment = async (req, res) => {
  try {
    let user;
    let data = req.body;
    data.shop = req.params.shop;
    const newPayment = new Payment(data);

    const kassa = await Kassa.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(1);

    if (kassa) {
      await kassa[0].addAmount(newPayment.amount);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }

    const admin = await Admin.findById(req.body.salesman);
    if (admin) {
      await admin.addSalary(req.body.amount);
    } else {
      res.status(404).send({ message: 'Salesman not found!' });
    }

    if (req.body.userId) {
      user = await User.findById(req.body.userId);
      await user.minusLoan(req.body.amount, newPayment._id);
    } else {
      res.status(404).send({ message: 'user not found!' });
    }

    await newPayment.save();

    res.status(200).send({
      message: 'Payment Added Successfully!',
      newPayment,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllPayment = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }
    const AllPayments = await Payment.find({ shop: req.params.shop });
    const limit = parseInt(size);
    const payments = await Payment.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('salesman')
      .populate('shop');
    res.send({
      payments: payments,
      count: payments.length,
      totalPage: Math.ceil(AllPayments.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (payment) {
      const paymentDiff = payment.amount - req.body.amount;
      payment.amount = req.body.amount;
      payment.paymentMethod = req.body.paymentMethod;
      payment.loan = req.body.loan;
      const kassa = await Kassa.find({ shop: req.params.shop })
        .sort({ _id: -1 })
        .limit(1);
      if (kassa) {
        await kassa[0].minusAmount(paymentDiff);
      } else {
        res.status(404).send({ message: 'Kassa not found!' });
      }
      const admin = await Admin.findById(req.body.salesman);
      if (admin) {
        await admin.removeSalary(paymentDiff);
      } else {
        res.status(404).send({ message: 'Salesman not found!' });
      }
      await payment.save();

      res.send({ message: 'Payment Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Payment not found!' });
  }
};

const deletePayment = async (req, res) => {
  let user;
  const payment = await Payment.findById(req.params.id);
  if (payment) {
    const kassa = await Kassa.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(1);
    if (kassa) {
      await kassa[0].minusAmount(payment.amount);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }

    const admin = await Admin.findById(payment.salesman);
    if (admin) {
      await admin.removeSalary(payment.amount);
    } else {
      res.status(404).send({ message: 'Salesman not found!' });
    }
    if (req.body.userId) {
      user = await User.findById(req.body.userId);
      await user.minusAmount(req.body.amount);
    } else {
      res.status(404).send({ message: 'user not found!' });
    }

    Payment.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Payment Deleted Successfully!',
        });
      }
    });
  } else {
    res.status(404).send({ message: 'Payment not found!' });
  }
};

module.exports = {
  addPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
};
