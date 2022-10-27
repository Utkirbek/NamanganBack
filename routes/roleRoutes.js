const express = require('express');
const router = express.Router();
const {
    addRole,
    getAllRole,
    getRoleById,
    updateRole,
    deleteRole,
} = require('../controller/roleController');

//add a role
router.post('/add', addRole);

//get all role
router.get('/', getAllRole);

//get a role
router.get('/:id', getRoleById);

//update a role
router.put('/:id', updateRole);

//delete a role
router.delete('/:id', deleteRole);


module.exports = router;
