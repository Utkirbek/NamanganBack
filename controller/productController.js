const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send({
      message: "Product Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }

    const limit = parseInt(size);
    const getAllProducts = await Product.find({})
      .populate("currency")
      .sort({ _id: -1 });
    const products = await Product.find({})
      .sort({ _id: -1 })
      .populate("currency")
      .limit(limit)
      .skip((page - 1) * limit);

    const Products = [];
    products.forEach((product) => {
      const calculatedPrice = product.price * product.currency.equalsTo;
      product.price = calculatedPrice;
      Products.push(product);
    });
    res.send({
      products: Products,
      count: Products.length,
      totalPage: Math.ceil(getAllProducts.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("currency");

    const calculatedPrice = product.price * product.currency.equalsTo;
    product.price = calculatedPrice;
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.originalPrice = req.body.originalPrice;
      product.code = req.body.code;
      product.title = req.body.title;
      product.description = req.body.description;
      product.quantity = req.body.quantity;
      product.price = req.body.price;
      product.discounts = req.body.discounts;
      product.image = req.body.image;
      product.currency = req.body.currency;
      product.minQuantity = req.body.minQuantity;
      product.unit = req.body.unit;
      await product.save();
      res.send({ data: product, message: "Product updated successfully!" });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Product Deleted Successfully!",
      });
    }
  });
};

const searchProduct = async (req, res) => {
  try {
    if (req.params.title) {
      const products = await Product.find({
        $or: [
          { title: { $regex: new RegExp(req.params.title, "i") } },
          { code: { $regex: req.params.title } },
        ],
      }).populate("currency");

      const Products = [];
      products.forEach((product) => {
        const calculatedPrice = product.price * product.currency.equalsTo;
        product.price = calculatedPrice;
        Products.push(product);
      });
      res.send(Products);
    } else {
      res.status(404).send({
        message: "Not Found!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProduct,
};
