const Loan = require('../models/Loan');

const addLoan = async (req, res) => {
  try {
    const newLoan = new Loan(req.body);
    await newLoan.save();
    res.status(200).send({
      message: "Loan Added Successfully!",
      newLoan,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllLoan = async (req, res) => {
  try {
    const loans = await Loan.find({})
      .sort({ _id: -1 })
      .populate("user")
      .populate("salesman");
    res.send(loans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateLoan= async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (loan) {
      loan.amount = req.body.amount;
      loan.shouldPay= req.body.shouldPay 
      await loan.save();
      res.send({ message: 'Loan Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Loan not found!' });
  }
};

const deleteLoan = (req, res) => {
  Loan.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Loan Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addLoan,
  getAllLoan,
  updateLoan,
  deleteLoan,
};
