const ProductsModel = require("../models/products");
const { validationResult } = require("express-validator");

const showProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
  
      let query = {};
  
      if (search) {
        query = { title: { $regex: new RegExp(search, "i") } };
      }
  
      const products = await ProductsModel.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('category', 'name');
  
      const count = await ProductsModel.countDocuments(query);
  
      res.status(200).json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

const addProduct = async (req, res) => {


  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = new ProductsModel(req.body);

    await product.save();

    res.status(201).json({ product, message: "product added successfully" });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: "Adding new product failed" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const product = await ProductsModel.findById(req.params.id);

    if (!product) {
      res.status(404).json({ error: "Data not found" });
    } else {
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.stockQuantity = req.body.stockQuantity;

      await product.save();

      res
        .status(200)
        .json({ product, message: "product updated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductsModel.deleteOne({ _id: req.params.id });

    if (product?.deletedCount === 1) {
      res.status(200).json({ message: "product deleted successfully" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { showProducts, addProduct, updateProduct, deleteProduct };
