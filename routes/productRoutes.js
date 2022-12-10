const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProduct,
  allProducts,
} = require('../controller/productController');

//add a product
router.post('/add', addProduct);

router.get('/:id', getProductById);

//get all products
router.get('/', getAllProducts);

//all products
router.post('/all', allProducts);

//update a product
router.put('/:id', updateProduct);

//delete a product
router.delete('/:id', deleteProduct);

//search a product
router.get('/search/:title', searchProduct);

module.exports = router;
