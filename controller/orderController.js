const Order = require('../models/Order');
const Admin = require('../models/Admin');

const createOrder = async (req, res) => {
  try {
    
    const order = await Order.create(req.body);
    const admin = await Admin.findById(req.body.salesman);
    admin.addSalary(order.total);
    res.send({
      message: 'Order Created Successfully!',
    })
  } catch (err) {   
    res.status(500).send(err.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ _id: -1 }).populate('user').populate('salesman').populate("cart.product");
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).sort({ _id: -1 });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Order Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  deleteOrder,
  createOrder,
};
