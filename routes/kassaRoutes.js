const express = require('express');
const router = express.Router();
const { getAllKassa, dailyKassa } = require("../controller/kassaController");

//get all kassa
router.get("/:shop/", getAllKassa);

//create new kassa
router.get("/:shop/add", dailyKassa);







module.exports = router;
