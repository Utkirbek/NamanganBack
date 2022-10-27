const Role = require('../models/Role');

const addRole = async (req, res) => {
  try {
    const newRole = new Role(req.body);
    await newRole.save();
    res.status(200).send({
      message: 'Role Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllRole = async (req, res) => {
  try {
    const roles = await Role.find({}).sort({ _id: -1 });
    res.send(roles);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.send(role);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (role) {
      role.name = req.body.name;
      role.permissions = req.body.permissions;
      await role.save();
      res.send({ message: 'Role Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Role not found!' });
  }
};

const deleteRole = (req, res) => {
  Role.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Role Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addRole,
  getAllRole,
  getRoleById,
  updateRole,
  deleteRole,
};
