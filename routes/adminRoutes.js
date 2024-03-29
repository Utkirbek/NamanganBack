const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  searchAdmin,
  giveSalary,
} = require('../controller/adminController');

//register a staff
router.post('/register', registerAdmin);

//login a admin
router.post('/login', loginAdmin);

//add a staff

router.post('/add', addStaff);

//get all staff
router.get('/', getAllStaff);

//get a staff
router.get('/:id', getStaffById);

//update a staff
router.put('/:id', updateStaff);

//delete a staff
router.delete('/:id', deleteStaff);

//search a staff
router.get('/search/:name', searchAdmin);

//give salary to a staff
router.post('/:shop/salary', giveSalary);

module.exports = router;
