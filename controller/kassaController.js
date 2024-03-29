const Kassa = require('../models/Kassa');
const Shop = require('../models/Shop');

const dailyKassa = async (req, res) => {
  try {
    const shops = await Shop.find({});

    for (let i = 0; i <= shops.length - 1; i++) {
      const newKassa = new Kassa({ shop: shops[i]._id });
      await newKassa.save();

      console.log('new kassa created');
    }
  } catch (err) {
    console.log('error in creating new kassa');
  }
};

const getAllKassa = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }

    const limit = parseInt(size);
    const AllKassa = await Kassa.find({ shop: req.params.shop });
    const kassas = await Kassa.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('shop');
    res.send({
      kassas: kassas,
      count: kassas.length,
      totalPage: Math.ceil(AllKassa.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDailyKassa = async (req, res) => {
  try {
    const kassas = await Kassa.find({ shop: req.params.shop }).sort({
      _id: -1,
    });
    const kassa = kassas[0];

    const total = kassa.cash + kassa.terminal + kassa.click;
    res.send({
      total: total,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
module.exports = {
  getAllKassa,
  dailyKassa,
  getDailyKassa,
};
