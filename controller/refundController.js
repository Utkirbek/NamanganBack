const Refund = require('../models/Refund');

const getAllRefund = async (req, res) => {
  try {
    const categories = await Refund.find({
      shop: req.params.shop,
    }).sort({ _id: -1 });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllRefund,
};
