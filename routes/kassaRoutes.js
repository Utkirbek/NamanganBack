const express = require('express');
const router = express.Router();
const { getAllKassa, dailyKassa } = require("../controller/kassaController");

//get all role
router.get("/", getAllKassa);
router.post("/add", dailyKassa);




module.exports = router;
