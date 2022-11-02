const express = require('express');
const router = express.Router();
const {
    addLoan,
    getAllLoan,
    updateLoan,
    deleteLoan,
} = require('../controller/loanController');

//add a role
router.post('/add', addLoan);

//get all role
router.get('/', getAllLoan);

//update a role
router.put('/:id', updateLoan);

//delete a role
router.delete('/:id', deleteLoan);


module.exports = router;
