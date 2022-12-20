const express = require('express');
const router = express.Router();
const {
  getAllProfit,
  dailyProfit,
} = require('../controller/profitController');

//get all Profit
router.get('/:shop/', getAllProfit);

//create new Profit
router.get('/:shop/add', dailyProfit);

module.exports = router;
