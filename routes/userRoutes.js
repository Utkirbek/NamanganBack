const express = require('express');
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controller/userController');
const {
  passwordVerificationLimit,
  emailVerificationLimit,
} = require('../config/others');




router.post('/add', registerUser);



//get all user
router.get('/', getAllUsers);

//get a user
router.get('/:id', getUserById);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

module.exports = router;
