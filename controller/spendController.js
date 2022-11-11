const Spend = require("../models/Spend");
const Kassa = require("../models/Kassa");

const addSpend = async (req, res) => {
  try {
    const newSpend = new Spend(req.body);
    const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
    await kassa[0].minusAmount(newSpend.amount);
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
      spend.spendType = req.body.spendType;
      spend.paymentMethod = req.body.paymentMethod;
      spend.description = req.body.description;

      await spend.save();
      res.send({ message: "Spend Updated Successfully!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Spend not found!" });
  }
};

const deleteSpend = async (req, res) => {
  const spend = await Spend.findById(req.params.id);
  const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
  await kassa[0].addAmount(spend.amount);
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
