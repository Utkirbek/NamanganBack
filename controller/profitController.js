const Profit = require('../models/Profit');
const Shop = require('../models/Shop');

const dailyProfit = async (req, res) => {
  try {
    const shops = await Shop.find({});

    for (let i = 0; i <= shops.length - 1; i++) {
      const newProfit = new Profit({ shop: shops[i]._id });
      await newProfit.save();

      console.log('new Profit created');
    }
  } catch (err) {
    console.log('error in creating new Profit');
  }
};

const getAllProfit = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }

    const limit = parseInt(size);
    const AllProfit = await Profit.find({ shop: req.params.shop });
    const Profits = await Profit.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('shop');
    res.send({
      Profits: Profits,
      count: Profits.length,
      totalPage: Math.ceil(AllProfit.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
module.exports = {
  getAllProfit,
  dailyProfit,
};
