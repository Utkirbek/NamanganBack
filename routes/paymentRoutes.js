const express = require('express');
const router = express.Router();
const {
  
    getAllPayments,
    deletePayment,
} = require('../controller/paymentController');


//get all role
router.get('/', getAllPayments);

//delete a role
router.delete('/:id', deletePayment);


module.exports = router;
