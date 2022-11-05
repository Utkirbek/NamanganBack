const Spend = require("../models/Spend");

const addSpend = async (req, res) => {
  try {
    const newSpend = new Spend(req.body);
    await newSpend.save();
    res.status(200).send({
      message: "Spend Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllSpend = async (req, res) => {
  try {
    const spends = await Spend.find({}).sort({ _id: -1 });
    res.send(spends);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateSpend = async (req, res) => {
  try {
    const spend = await Spend.findById(req.params.id);
    if (spend) {
      spend.amount = req.body.amount;
      spend.paymentMethod = req.body.paymentMethod;
      spend.description = req.body.description;

      await spend.save();
      res.send({ message: "Spend Updated Successfully!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Spend not found!" });
  }
};

const deleteSpend = (req, res) => {
  Spend.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Spend Deleted Successfully!",
      });
    }
  });
};

module.exports = {
  addSpend,
  getAllSpend,
  updateSpend,
  deleteSpend,
};
