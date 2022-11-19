const User = require("../models/User");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const Kassa = require("../models/Kassa");

const mainStatistics = async (req, res) => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const admins = await Admin.countDocuments();
    const lastMonthAdmins = await Admin.countDocuments({
      createdAt: { $lte: lastMonth },
    });

    const users = await User.countDocuments();

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $lte: lastMonth },
    });

    const products = await Product.countDocuments();

    lastMonthProducts = await Product.countDocuments({
      createdAt: { $lte: lastMonth },
    });

    const kassa = await Kassa.find();
    const lastMonthKassa = await Kassa.find({
      createdAt: { $lte: lastMonth },
    });

    let total = 0;
    let lastMonthTotal = 0;
    kassa.forEach((item) => {
      total += item.amount;
    });
    lastMonthKassa.forEach((item) => {
      lastMonthTotal += item.amount;
    });

    data = {
      admins: {
        total: admins,
        diff: admins - lastMonthAdmins,
      },
      users: {
        total: users,
        diff: users - lastMonthUsers,
      },
      products: {
        total: products,
        diff: products - lastMonthProducts,
      },
      kassa: {
        total: total,
        diff: total - lastMonthTotal,
      },
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const pieChartStatistics = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  mainStatistics,
  pieChartStatistics,
};
