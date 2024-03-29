const express = require('express');
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
  filterUser,
} = require('../controller/userController');

router.post('/add', registerUser);

//get all user
router.get('/', getAllUsers);

//get a user
router.get('/:id', getUserById);

//get a user
router.post('/filter', filterUser);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

//search a user
router.get('/search/:name', searchUser);

module.exports = router;
