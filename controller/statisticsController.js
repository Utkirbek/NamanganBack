const User = require('../models/User');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Kassa = require('../models/Kassa');
const Spend = require('../models/Spend');
const Order = require('../models/Order');
const Profit = require('../models/Profit');

const mainStatistics = async (req, res) => {
  try {
    const Allproducts = await Product.find({}).populate('currency');

    let budget = 0;

    Allproducts.forEach((product) => {
      if (product.currency) {
        let amount =
          +product.currency.equalsTo *
          +product.originalPrice *
          product.quantity;

        budget = budget + amount;
      } else {
        let amount = +product.originalPrice * product.quantity;

        budget = budget + amount;
      }
    });

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

    const kassa = await Kassa.find({ shop: req.params.shop });
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
      budget: {
        total: budget.toFixed(1),
      },
    };
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const pieChartIncome = async (req, res) => {
  try {
    let { isAll } = req.query;
    weeks = [];
    let kassa;
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setMonth(currentMonth.getMonth());
    const monthName = currentMonth.toLocaleString('default', {
      month: 'long',
    });

    for (let i = 0; i < 4; i++) {
      const start = new Date();
      start.setDate(currentMonth.getDate() + 7 * i);
      const end = new Date();
      end.setDate(currentMonth.getDate() + 7 * (i + 1));
      if (isAll === true) {
        kassa = await Kassa.find({
          createdAt: { $gte: start, $lte: end },
        });
      } else {
        kassa = await Kassa.find({
          shop: req.params.shop,
          createdAt: { $gte: start, $lte: end },
        });
      }

      let total = 0;
      kassa.forEach((item) => {
        total += item.amount;
      });
      if (i == 0) {
        weeks.push({
          name: 'First week',
          value: total,
        });
      } else if (i == 1) {
        weeks.push({
          name: 'Second week',
          value: total,
        });
      } else if (i == 2) {
        weeks.push({
          name: 'Third week',
          value: total,
        });
      } else {
        weeks.push({
          name: 'Fourth week',
          value: total,
        });
      }
    }
    data = {
      month: monthName,
      weeks: weeks,
    };

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const pieChartSpend = async (req, res) => {
  try {
    weeks = [];
    let spend;
    let { isAll } = req.query;
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setMonth(currentMonth.getMonth());
    const monthName = currentMonth.toLocaleString('default', {
      month: 'long',
    });

    for (let i = 0; i < 4; i++) {
      const start = new Date();
      start.setDate(currentMonth.getDate() + 7 * i);
      const end = new Date();
      end.setDate(currentMonth.getDate() + 7 * (i + 1));

      if (isAll === true) {
        spend = await Spend.find({
          createdAt: { $gte: start, $lte: end },
        });
      } else {
        spend = await Spend.find({
          shop: req.params.shop,
          createdAt: { $gte: start, $lte: end },
        });
      }

      let total = 0;
      spend.forEach((item) => {
        total += item.amount;
      });
      if (i == 0) {
        weeks.push({
          name: 'First week',
          value: total,
        });
      } else if (i == 1) {
        weeks.push({
          name: 'Second week',
          value: total,
        });
      } else if (i == 2) {
        weeks.push({
          name: 'Third week',
          value: total,
        });
      } else {
        weeks.push({
          name: 'Fourth week',
          value: total,
        });
      }
    }
    data = {
      month: monthName,
      weeks: weeks,
    };

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const pieChartStaffSalary = async (req, res) => {
  try {
    data = new Array();
    const admins = await Admin.find();
    for (let i = 0; i < admins.length; i++) {
      data.unshift({
        name: admins[i].name,
        value: admins[i].earned_salary,
      });
    }
    // admins.forEach((item) => {
    //   data.unshift({
    //     name: item.name,
    //     value: item.earned_salary,
    //   });
    // });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const barChart = async (req, res) => {
  try {
    let { isAll } = req.query;
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setMonth(currentMonth.getMonth());
    const monthName = currentMonth.toLocaleString('default', {
      month: 'long',
    });

    const days = [];
    let profit;
    for (let i = 0; i < 30; i++) {
      const start = new Date();
      start.setDate(currentMonth.getDate() + i);
      const end = new Date();
      end.setDate(currentMonth.getDate() + i + 1);

      const dayName = start.toLocaleString('default', {
        weekday: 'long',
      });
      if (isAll === true) {
        profit = await Profit.find({
          createdAt: { $gte: start, $lte: end },
        });
      } else {
        profit = await Profit.find({
          shop: req.params.shop,
          createdAt: { $gte: start, $lte: end },
        });
      }

      let profitTotal = 0;
      profit.forEach((item) => {
        profitTotal += item.amount;
      });

      data = {
        date: `${dayName} / ${monthName} ${i + 1}`,
        value: profitTotal,
      };
      days.push(data);
    }
    res.status(200).send(days);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  mainStatistics,
  pieChartIncome,
  pieChartSpend,
  pieChartStaffSalary,
  barChart,
};
