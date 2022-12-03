const express = require('express');
const router = express.Router();
const { getAllKassa, dailyKassa } = require("../controller/kassaController");

//get all kassa
router.get("/", getAllKassa);

//create new kassa
router.get("/add", dailyKassa);






module.exports = router;
