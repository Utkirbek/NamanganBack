const Kassa = require('../models/Kassa');

const addKassa = async (req, res) => {
  try {
    const newKassa = new Kassa(req.body);
    await newKassa.save();
    res.status(200).send({
      message: 'Kassa Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllKassa = async (req, res) => {
  try {
    const kassas = await Kassa.find({}).sort({ _id: -1 });
    res.send(kassas);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
module.exports = {
  getAllKassa,
};
