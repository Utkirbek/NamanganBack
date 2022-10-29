const express = require('express');
const router = express.Router();
const {
    addPermission,
    getAllPermission,
    updatePermission,
    deletePermission,
} = require('../controller/permissionController');

//add a role
router.post('/add', addPermission);

//get all role
router.get('/', getAllPermission);

//update a role
router.put('/:id', updatePermission);

//delete a role
router.delete('/:id', deletePermission);


module.exports = router;
