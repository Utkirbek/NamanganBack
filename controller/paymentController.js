const Payment = require('../models/Payment');

const addPayment = async (req, res) => {
  try {
    const payment = Payment.findById(req.params.id);
    if (payment) {
        payment.addPayment(req.body.amount);
        res.status(200).send({
            message: 'Payment Added Successfully!',
        });
        }
    else
    {
        res.status(404).send({
            message: 'Payment Not Found!',
        });
    }
        
  } catch (err) {
    return err.message;
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ _id: -1 });
    res.send(payments);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

 
const deletePayment = (req, res) => {
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
};

module.exports = {
    addPayment,
    getAllPayments,
    deletePayment,
};
