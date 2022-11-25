const express = require('express');
const router = express.Router();
const {
  addShop,
  getAllShop,
  getShopById,
  updateShop,
  deleteShop,
} = require('../controller/shopController');

//add a Shop
router.post('/add', addShop);

//get all Shop
router.get('/', getAllShop);

//get a Shop
router.get('/:id', getShopById);

//update a Shop
router.put('/:id', updateShop);

//delete a Shop
router.delete('/:id', deleteShop);

module.exports = router;
