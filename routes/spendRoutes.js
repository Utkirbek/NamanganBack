const express = require('express');
const router = express.Router();
const {
  addSpend,
  getAllSpend,
  updateSpend,
  deleteSpend,
} = require('../controller/spendController');

//add a spend
router.post('/add', addSpend);

//get all spend
router.get('/', getAllSpend);

//update a spend
router.put('/:id', updateSpend);

//delete a spend
router.delete('/:id', deleteSpend);

module.exports = router;
