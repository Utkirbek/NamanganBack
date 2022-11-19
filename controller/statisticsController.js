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

const pieChartIncome = async (req, res) => {
  try {
    weeks = [];
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setMonth(currentMonth.getMonth());
    const monthName = currentMonth.toLocaleString("default", {
      month: "long",
    });

    for (let i = 0; i < 4; i++) {
      const start = new Date();
      start.setDate(currentMonth.getDate() + 7 * i);
      const end = new Date();
      end.setDate(currentMonth.getDate() + 7 * (i + 1));
      const kassa = await Kassa.find({
        createdAt: { $gte: start, $lte: end },
      });
      let total = 0;
      kassa.forEach((item) => {
        total += item.amount;
      });
      if (i == 0) {
        weeks.push({
          name: "First week",
          value: total,
        });
      } else if (i == 1) {
        weeks.push({
          name: "Second week",
          value: total,
        });
      } else if (i == 2) {
        weeks.push({
          name: "Third week",
          value: total,
        });
      } else {
        weeks.push({
          name: "Fourth week",
          value: total,
        });
      }
    }
    data = {
      month: monthName,
      weeks: weeks,
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  mainStatistics,
  pieChartIncome,
};
