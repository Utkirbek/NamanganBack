const express = require("express");
const router = express.Router();
const {
  mainStatistics,
  pieChartIncome,
} = require("../controller/statisticsController");

//add a coupon
router.get("/main", mainStatistics);
router.get("/pie/income", pieChartIncome);

module.exports = router;
