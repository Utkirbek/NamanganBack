const express = require("express");
const router = express.Router();
const {
  addPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
} = require("../controller/paymentController");

//add a payment
router.post("/add", addPayment);

//get all payment
router.get("/", getAllPayment);

//update a payment
router.put("/:id", updatePayment);

//delete a payment
router.delete("/:id", deletePayment);

module.exports = router;
