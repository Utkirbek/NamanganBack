const express = require('express');
const router = express.Router();
const {
  addLoan,
  getAllLoan,
  updateLoan,
  deleteLoan,
  getLoanByUserId,
} = require("../controller/loanController");

//add a loan
router.post("/add", addLoan);

// get loans by user id
router.get("/user/:id", getLoanByUserId);

//get all loan
router.get('/', getAllLoan);

//update a loan
router.put('/:id', updateLoan);

//delete a loan
router.delete('/:id', deleteLoan);


module.exports = router;
