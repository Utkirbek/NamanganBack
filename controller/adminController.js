const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const { signInToken } = require('../config/auth');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const Role = require('../models/Role');
const Profit = require('../models/Profit');
const Kassa = require('../models/Kassa');
const Spend = require('../models/Spend');

const registerAdmin = async (req, res) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(403).send({
        message: 'This Email already Added!',
      });
    } else {
      const newStaff = new Admin({
        image: req.body.image,
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
        image: staff.image,
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
    const role = await Role.findById(admin.role).populate(
      'permissions'
    );
    if (role) {
      admin.role = role;
    } else {
      admin.role = null;
    }
    if (
      admin &&
      bcrypt.compareSync(req.body.password, admin.password)
    ) {
      const token = signInToken(admin);
      res.send({
        token,
        admin,
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
        image: req.body.image,
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
    const admins = await Admin.find({})
      .sort({ _id: -1 })
      .populate('role');
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
    const orders = await Order.find({ salesman: req.params.id });
    const role = await Role.findById(admin.role).populate(
      'permissions'
    );
    if (role) {
      admin.role = role;
    } else {
      admin.role = null;
    }
    if (orders) {
      admin.orders = orders;
    } else {
      admin.orders = null;
    }
    admin.password = undefined;
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
    } else {
      res.status(404).send('Staff not found');
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
    const search = req.params.name.toString();
    if (search) {
      const admin = await Admin.find({
        name: {
          $regex: new RegExp(search, 'i'),
        },
      });
      if (admin) {
        res.send(admin);
      } else {
        res.status(404).send({
          message: 'Admin Not Found!',
        });
      }
    } else {
      res.send({ message: 'Search Name is provided' });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const giveSalary = async (req, res) => {
  try {
    const admin = await Admin.findById(req.body.staff);
    const paymentMethod = 'cash';

    const kassa = await Kassa.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(1);

    if (kassa) {
      await kassa[0].minusAmount(req.body.amount, paymentMethod);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }
    const profit = await Profit.find({ shop: req.params.shop })
      .sort({ _id: -1 })
      .limit(1);
    if (profit) {
      await profit[0].minusAmount(req.body.amount);
    } else {
      res.status(404).send({ message: 'Profit not found!' });
    }
    if (admin) {
      admin.getSalary(req.body.amount);
    } else {
      res.status(500).send({
        message: 'Salesman not found!',
      });
    }

    const newSpend = await Spend.create({
      shop: req.params.shop,
      amount: req.body.amount,
      spendType: 'spend',
      paymentMethod: 'naqt',
      description: `${admin.name}ga oylik maosh`,
    });

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
