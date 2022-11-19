const express = require("express");
const router = express.Router();
const {
  mainStatistics,
  pieChartStatistics,
} = require("../controller/statisticsController");

//add a coupon
router.get("/main", mainStatistics);
router.get("/pie", pieChartStatistics);

module.exports = router;
