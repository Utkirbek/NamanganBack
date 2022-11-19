const express = require("express");
const router = express.Router();
const {
  mainStatistics,
  pieChartIncome,
  pieChartSpend,
  pieChartStaffSalary,
} = require("../controller/statisticsController");

//add a coupon
router.get("/main", mainStatistics);
router.get("/pie/income", pieChartIncome);
router.get("/pie/spend", pieChartSpend);
router.get("/pie/staffsalary", pieChartStaffSalary);


module.exports = router;
