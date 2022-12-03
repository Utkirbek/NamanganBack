const express = require('express');
const router = express.Router();
const {
  addPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
} = require('../controller/paymentController');

//add a payment
router.post('/:shop/add', addPayment);

//get all payment
router.get('/:shop/', getAllPayment);

//update a payment
router.put('/:shop/:id', updatePayment);

//delete a payment
router.delete('/:shop/:id', deletePayment);

module.exports = router;
