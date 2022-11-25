const Shop = require('../models/Shop');

const addShop = async (req, res) => {
  try {
    const newShop = new Shop(req.body);
    await newShop.save();
    res.status(200).send({
      message: 'Shop Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllShop = async (req, res) => {
  try {
    const shops = await Shop.find({})
      .sort({ _id: -1 })
      .populate('permissions');
    res.send(shops);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.send(shop);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (shop) {
      shop.name = req.body.name;
      shop.location = req.body.location;
      await shop.save();
      res.send({ message: 'Shop Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Shop not found!' });
  }
};

const deleteShop = (req, res) => {
  Shop.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Shop Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addShop,
  getAllShop,
  getShopById,
  updateShop,
  deleteShop,
};
