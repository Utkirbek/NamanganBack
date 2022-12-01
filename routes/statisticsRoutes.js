const express = require('express');
const router = express.Router();
const {
  mainStatistics,
  pieChartIncome,
  pieChartSpend,
  pieChartStaffSalary,
  barChart,
} = require('../controller/statisticsController');

//add a coupon
router.get('/main', mainStatistics);
router.get('/pie/income', pieChartIncome);
router.get('/pie/spend', pieChartSpend);
router.get('/pie/staffsalary', pieChartStaffSalary);
router.get('/bar', barChart);

module.exports = router;
