const Permission = require('../models/Permission');

const addPermission = async (req, res) => {
  try {
    const newPermission = new Permission(req.body);
    await newPermission.save();
    res.status(200).send({
      message: 'Permission Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllPermission = async (req, res) => {
  try {
    const permissions = await Permission.find({}).sort({ _id: -1 });
    res.send(permissions);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (permission) {
      permission.name = req.body.name;
      await permission.save();
      res.send({ message: 'Permission Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Permission not found!' });
  }
};

const deletePermission = (req, res) => {
  Permission.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.send({ message: 'Permission Deleted Successfully!' });
    }
  });
};

module.exports = {
  addPermission,
  getAllPermission,
  updatePermission,
  deletePermission,
};
