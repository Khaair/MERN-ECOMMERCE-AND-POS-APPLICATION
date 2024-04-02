const OrdersModel = require("../models/orders.js");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const showOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = {};

    if (search) {
      query = { title: { $regex: new RegExp(search, "i") } };
    }

    const products = await OrdersModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("user")
      .populate({
        path: "products.product",
        model: "products",
      });

    const count = await OrdersModel.countDocuments(query);

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

const addOrder = async (req, res) => {
  // const user = req.user;
  // console.log("userInfo",user?.userId)

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const order = new OrdersModel(req.body);

    await order.save();

    res.status(201).json({ order, message: "order added successfully" });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: "Adding new order failed" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const order = await OrdersModel.findById(req.params.id);

    if (!order) {
      res.status(404).json({ error: "Data not found" });
    } else {
      order.name = req.body.name;
      order.description = req.body.description;
      order.price = req.body.price;
      order.category = req.body.category;
      order.brand = req.body.brand;
      order.stockQuantity = req.body.stockQuantity;

      await product.save();

      res
        .status(200)
        .json({ product, message: "product updated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const product = await OrdersModel.deleteOne({ _id: req.params.id });

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

module.exports = { showOrders, addOrder, updateOrder, deleteOrder };
