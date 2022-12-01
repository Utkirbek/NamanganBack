const Spend = require('../models/Spend');
const Kassa = require('../models/Kassa');

const addSpend = async (req, res) => {
  try {
    const newSpend = new Spend(data);
    const kassa = await Kassa.find().sort({ _id: -1 }).limit(1);
    if (kassa) {
      await kassa[0].minusAmount(newSpend.amount);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }

    await newSpend.save();
    res.status(200).send({
      message: 'Spend Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllSpend = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }
    const limit = parseInt(size);

    const AllSpends = await Spend.find({});
    const spends = await Spend.find({})
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    res.send({
      spends: spends,
      count: spends.length,
      totalPage: Math.ceil(AllSpends.length / limit),
    });
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
      res.send({ message: 'Spend Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Spend not found!' });
  }
};

const deleteSpend = async (req, res) => {
  const spend = await Spend.findById(req.params.id);
  if (spend) {
    const kassa = await Kassa.find({}).sort({ _id: -1 }).limit(1);
    if (kassa) {
      await kassa[0].addAmount(spend.amount);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }
    Spend.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Spend Deleted Successfully!',
        });
      }
    });
  }
};

module.exports = {
  addSpend,
  getAllSpend,
  updateSpend,
  deleteSpend,
};
