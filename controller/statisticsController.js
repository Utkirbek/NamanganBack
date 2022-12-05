const User = require('../models/User');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Kassa = require('../models/Kassa');
const Spend = require('../models/Spend');
const Order = require('../models/Order');
const Profit = require('../models/Profit');

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
    weeks = [];
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
      const kassa = await Kassa.find({
        shop: req.params.shop,
        createdAt: { $gte: start, $lte: end },
      });
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
      const spend = await Spend.find({
        shop: req.params.shop,
        createdAt: { $gte: start, $lte: end },
      });
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
    data = [];
    const admins = await Admin.find();
    admins.forEach((item) => {
      data.push({
        name: item.name,
        value: item.earned_salary,
      });
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const barChart = async (req, res) => {
  try {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setMonth(currentMonth.getMonth());
    const monthName = currentMonth.toLocaleString('default', {
      month: 'long',
    });

    const days = [];
    for (let i = 0; i < 30; i++) {
      const start = new Date();
      start.setDate(currentMonth.getDate() + i);
      const end = new Date();
      end.setDate(currentMonth.getDate() + i + 1);

      const dayName = start.toLocaleString('default', {
        weekday: 'long',
      });

      const profit = await Profit.find({
        shop: req.params.shop,
        createdAt: { $gte: start, $lte: end },
      });
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
