const express = require('express');
const router = express.Router();
const {
  addPermission,
  getAllPermission,
  updatePermission,
  deletePermission,
} = require('../controller/permissionController');

//add a permission
router.post('/add', addPermission);

//get all permission
router.get('/', getAllPermission);

//update a permission
router.put('/:id', updatePermission);

//delete a permission
router.delete('/:id', deletePermission);

module.exports = router;
