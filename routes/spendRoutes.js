const express = require('express');
const router = express.Router();
const {
  addSpend,
  getAllSpend,
  updateSpend,
  deleteSpend,
} = require('../controller/spendController');

//add a spend
router.post('/:shop/add', addSpend);

//get all spend
router.get('/:shop/', getAllSpend);

//update a spend
router.put('/:shop/:id', updateSpend);

//delete a spend
router.delete('/:shop/:id', deleteSpend);

module.exports = router;
