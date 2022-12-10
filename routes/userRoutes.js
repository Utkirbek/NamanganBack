const express = require('express');
const router = express.Router();
const uploader = require('../config/multer');
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
  getLoanByUser,
} = require('../controller/userController');

router.post('/add', uploader.single('file'), registerUser);

//get all user
router.get('/', getAllUsers);

//get a user
router.get('/:id', getUserById);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

//search a user
router.get('/search/:name', searchUser);

module.exports = router;
