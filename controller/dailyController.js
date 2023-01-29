const Daily = require('../models/Daily');
const Shop = require('../models/Shop');

const dailyDaily = async (req, res) => {
  try {
    const shops = await Shop.find({});

    for (let i = 0; i <= shops.length - 1; i++) {
      const newDaily = new Daily({ shop: shops[i]._id });
      await newDaily.save();

      console.log('new Daily created');
    }
  } catch (err) {
    console.log('error in creating new Daily');
  }
};

const getAllDaily = async (req, res) => {
  try {
    const Dailys = await Daily.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .populate('shop');
    const data = Dailys[0];
    res.send({ data });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
module.exports = {
  getAllDaily,
  dailyDaily,
};
