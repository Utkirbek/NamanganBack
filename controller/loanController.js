const Loan = require('../models/Loan');
const User = require('../models/User');

const addLoan = async (req, res) => {
  try {
    const data = req.body;
    data.shop = req.params.shop;
    const newLoan = new Loan(data);
    await newLoan.save();
    res.status(200).send({
      message: 'Loan Added Successfully!',
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
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }

    const limit = parseInt(size);

    const AllLoans = await Loan.find({ shop: req.params.shop });
    const loans = await Loan.find({ shop: req.params.shop })

      .sort({ _id: -1 })
      .populate('user')
      .populate('salesman')
      .populate('shop')
      .limit(limit)
      .skip((page - 1) * limit);
    res.send({
      loans: loans,
      count: loans.length,
      totalPage: Math.ceil(AllLoans.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (loan) {
      loan.amount = req.body.amount;
      loan.shouldPay = req.body.shouldPay;
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

const getLoanByUserId = async (req, res) => {
  try {
    const loan = await Loan.find({ user: req.params.id });
    res.status(200).send({
      loan,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addLoan,
  getAllLoan,
  updateLoan,
  deleteLoan,
  getLoanByUserId,
};
