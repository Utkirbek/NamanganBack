const Currency = require('../models/Currency');

const addCurrency = async (req, res) => {
  try {
    const newCategory = new Currency(req.body);
    await newCategory.save();
    res.status(200).send({
      message: 'Currency Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllCurrency = async (req, res) => {
  try {
    const categories = await Currency.find({}).sort({ _id: -1 });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateCurrency = async (req, res) => {
    try {
        const currency = await Currency.findById(req.params.id);
        if (currency) {
            currency.name = req.body.name || currency.name;
            currency.icon = req.body.icon || currency.icon;
            currency.equalsTo = req.body.equalsTo || currency.equalsTo;
            const updatedCurrency = await currency.save();
            res.send({
                _id: updatedCurrency._id,
                name: updatedCurrency.name,
                icon: updatedCurrency.icon,
                equalsTo: updatedCurrency.equalsTo,
            });
        } else {

            res.status(404).send({ message: 'Currency Not Found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
 
const deleteCurrency = (req, res) => {
    Currency.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Currency Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addCurrency,
  getAllCurrency,
  updateCurrency,
  deleteCurrency,
};
