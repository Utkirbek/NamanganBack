const Loan = require('../models/Loan');
const User = require('../models/User');

const addLoan = async (req, res) => {
  try {
    const newLoan = new Loan(req.body);
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
    const AllLoans = await Loan.find({});
    const loans = await Loan.find({})
      .sort({ _id: -1 })
      .populate('user')
      .populate('salesman')
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

const getLoanByUser = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
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
