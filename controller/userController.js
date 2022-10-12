require('dotenv').config();

const User = require('../models/User');
const { signInToken } = require('../config/auth');

const registerUser = async (req, res) => {
  try {
    const user  = await User.create(req.body);
    res.send({'message': 'User created successfully'});
  } catch (err) {
      
    res.status(500).send({
      message: err.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.extra = req.body.extra;
      user.workplace = req.body.workplace;
      user.phone = req.body.phone;
      user.image = req.body.image;
      const updatedUser = await user.save();
     
    }
    res.send({'message': 'User updated successfully'});
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'User Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
