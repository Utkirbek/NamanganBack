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
router.post("/:shop/add", addLoan);

// get loans by user id
router.get("/:shop/user/:id", getLoanByUserId);

//get all loan
router.get('/:shop/', getAllLoan);

//update a loan
router.put('/:shop/:id', updateLoan);

//delete a loan
router.delete('/:shop/:id', deleteLoan);


module.exports = router;
