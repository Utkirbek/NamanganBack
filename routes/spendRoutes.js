const express = require("express");
const router = express.Router();
const {
  addSpend,
  getAllSpend,
  updateSpend,
  deleteSpend,
} = require("../controller/spendController");

//add a role
router.post("/add", addSpend);

//get all role
router.get("/", getAllSpend);

//update a role
router.put("/:id", updateSpend);

//delete a role
router.delete("/:id", deleteSpend);

module.exports = router;
