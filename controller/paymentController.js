const Payment = require('../models/Payment');
const Kassa = require('../models/Kassa');
const Loan = require('../models/Loan');
const Admin = require('../models/Admin');

const addPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);

    const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
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
    if (req.body.loan) {
      const loan = await Loan.findById(req.body.loan);
      await loan.minusAmount(req.body.amount);
    } else {
      res.status(404).send({ message: 'Loan not found!' });
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
    const AllPayments = await Payment.find({});
    const limit = parseInt(size);
    const payments = await Payment.find({})
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('salesman');
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
      const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
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
  const payment = await Payment.findById(req.params.id);
  if (payment) {
    const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
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
    const loan = await Loan.findById(payment.loan);
    if (loan) {
      await loan.plusAmount(payment.amount);
    } else {
      res.status(404).send({ message: 'Loan not found!' });
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
