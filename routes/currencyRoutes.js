const express = require('express');
const router = express.Router();
const {
    addCurrency,
    getAllCurrency,
    updateCurrency,
    deleteCurrency,
} = require('../controller/currencyController');

router.post('/add', addCurrency);

//get all currencies
router.get('/', getAllCurrency);

//get all currency by a user
router.put('/:id', updateCurrency);

//delete currency
router.delete('/:id', deleteCurrency);

module.exports = router;
