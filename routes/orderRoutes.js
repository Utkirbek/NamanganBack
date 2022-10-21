const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  createOrder,
  deleteOrder,
} = require('../controller/orderController');

router.post('/add', createOrder);

//get all orders
router.get('/', getAllOrders);

//get all order by a user
router.get('/user/:id', getOrderByUser);

//get a order by id
router.get('/:id', getOrderById);

router.delete('/:id', deleteOrder);

module.exports = router;
