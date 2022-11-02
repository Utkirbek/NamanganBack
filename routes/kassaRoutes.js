const express = require('express');
const router = express.Router();
const {
    getAllKassa,


} = require('../controller/kassaController');


//get all role
router.get('/', getAllKassa);




module.exports = router;
