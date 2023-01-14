const express = require('express');
const router = express.Router();
const {
  mainStatistics,
  pieChartIncome,
  pieChartSpend,
  pieChartStaffSalary,
  barChart,
  barChartKassa,
} = require('../controller/statisticsController');

//add a coupon
router.get('/:shop/main', mainStatistics);
router.get('/:shop/pie/income', pieChartIncome);
router.get('/:shop/pie/spend', pieChartSpend);
router.get('/:shop/pie/staffsalary', pieChartStaffSalary);
router.get('/:shop/bar', barChart);
router.get('/:shop/bar/kassa', barChartKassa);

module.exports = router;
