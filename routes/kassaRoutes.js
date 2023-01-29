const express = require('express');
const router = express.Router();
const {
  getAllKassa,
  dailyKassa,
  getDailyKassa,
} = require('../controller/kassaController');

//get all kassa
router.get('/:shop/', getAllKassa);
//get all kassa
router.get('/:shop/daily', getDailyKassa);

//create new kassa
router.get('/:shop/add', dailyKassa);

module.exports = router;
