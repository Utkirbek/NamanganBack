const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const { signInToken } = require('../config/auth');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const Role = require('../models/Role');

const registerAdmin = async (req, res) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(403).send({
        message: 'This Email already Added!',
      });
    } else {
      
      const newStaff = new Admin({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password),
      });
      const staff = await newStaff.save();
      const token = signInToken(staff);
      res.send({
        token,
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        joiningData: Date.now(),
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = signInToken(admin);
      res.send({
        token,
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
      });
    } else {
      res.status(401).send({
        message: 'Invalid Admin or password!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addStaff = async (req, res) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    
    if (isAdded) {
      return res.status(500).send({
        message: 'This Email already Added!',
      });
    } else {
      const newStaff = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        salary_percent: req.body.salary_percent,
        role: req.body.role,
        image: req.body.image,
      });
      await newStaff.save();
      res.status(200).send({
        message: 'Staff Added Successfully!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const admins = await (await Admin.find({}).sort({ _id: -1 }));
    for (let i = 0; i < admins.length; i++) {
      admins[i].password = undefined;
    }
    res.send(admins);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getStaffById = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    const role = await Role.findById(admin.role).populate('permissions');
    const orders = await Order.find({ salesman: req.params.id });
    admin.password = undefined;
    admin.orders = orders;
    admin.role = role;
    console.log(admin)
    res.send(admin);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStaff = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.name = req.body.name;
      admin.email = req.body.email;
      admin.role = req.body.role;
      admin.password = req.body.password
        ? bcrypt.hashSync(req.body.password)
        : admin.password;
      admin.image = req.body.image;
      admin.salary_percent = req.body.salary_percent;
      const updatedAdmin = await admin.save();
      const token = signInToken(updatedAdmin);
      res.send({
        token,
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        image: updatedAdmin.image,
        joiningData: updatedAdmin.joiningData,
      });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteStaff = (req, res) => {
  Admin.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Admin Deleted Successfully!',
      });
    }
  });
};
const searchAdmin = async (req, res) => {
  try {
    if (req.params.name) {
      const admin = await Admin.find({ name: {
        $regex: req.params.name,
      } });
      res.send(admin);
    }else{
      res.send({'message': 'No admin found'});
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const giveSalary = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    admin.getSalary();
    res.send({
      message: 'Salary Given Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};



module.exports = {
  registerAdmin,
  loginAdmin,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  searchAdmin,
  giveSalary,
};
