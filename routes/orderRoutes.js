const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  createOrder,
  deleteOrder,
  updateOrder,
} = require('../controller/orderController');

router.post('/:shop/add', createOrder);

//get all orders
router.get('/:shop/', getAllOrders);

//get all order by a user
router.get('/:shop/user/:id', getOrderByUser);

//update a order
router.put('/:shop/:id', updateOrder);

//get a order by id
router.get('/:shop/:id', getOrderById);
//delete a order
router.delete('/:shop/:id', deleteOrder);

module.exports = router;
