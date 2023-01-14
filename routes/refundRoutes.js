const express = require('express');
const router = express.Router();
const { getAllRefund } = require('../controller/refundController');

//get all currencies
router.get('/:shop', getAllRefund);

module.exports = router;
