const Kassa = require('../models/Kassa');

const dailyKassa = async (req, res) => {
  try {
    const newKassa = new Kassa();
    await newKassa.save();
    console.log("new kassa created");
  } catch (err) {
    console.log("error in creating new kassa");
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
    const kassas = await Kassa.find({})
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    res.send(kassas);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
module.exports = {
  getAllKassa,
  dailyKassa,
};
