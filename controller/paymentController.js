const Payment = require("../models/Payment");
const Kassa = require("../models/Kassa");

const addPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
    await kassa[0].addAmount(newPayment.amount);
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
    const payments = await Payment.find({}).sort({ _id: -1 });
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
      payment.order = req.body.order;
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
