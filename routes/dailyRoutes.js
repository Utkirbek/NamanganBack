const express = require('express');
const router = express.Router();
const {
  getAllDaily,
  dailyDaily,
} = require('../controller/dailyController');

//get all Daily
router.get('/:shop/', getAllDaily);

//create new Daily
router.get('/:shop/add', dailyDaily);

module.exports = router;
