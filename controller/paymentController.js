const Payment = require("../models/Payment");
const Kassa = require("../models/Kassa");
const Loan = require("../models/Loan");
const Admin = require("../models/Admin");

const addPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
    const admin = await Admin.findById(req.body.salesman);
    await admin.addSalary(req.body.amount);
    await kassa[0].addAmount(newPayment.amount);
 
    if (req.body.loan) {
      const loan = await Loan.findById(req.body.loan);
      await loan.minusAmount(req.body.amount);
    }
    await newPayment.save();
    res.status(200).send({
      message: "Payment Added Successfully!",
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
    const limit = parseInt(size);
    const payments = await Payment.find({})
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("salesman");
    res.send(payments);
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
      payment.amount = req.body.amount;
      payment.paymentMethod = req.body.paymentMethod;
      payment.loan = req.body.loan;
      await payment.save();
      res.send({ message: "Payment Updated Successfully!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Payment not found!" });
  }
};

const deletePayment = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
  const admin = await Admin.findById(payment.salesman);
  await admin.removeSalary(payment.amount);
  await kassa[0].minusAmount(payment.amount);

  Payment.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Payment Deleted Successfully!",
      });
    }
  });
};

module.exports = {
  addPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
};
