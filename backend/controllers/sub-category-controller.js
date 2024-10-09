const categoryModel = require("../models/sub-category");
const { validationResult } = require("express-validator");

const showCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = {};

    if (search) {
      query = { title: { $regex: new RegExp(search, "i") } };
    }

    const data = await categoryModel
      .find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await categoryModel.countDocuments(query);

    res.status(200).json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const addData = new categoryModel(req.body);

    await addData.save();

    res.status(201).json({ data: addData, message: "Category added successfully", status: 201 });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: "Adding new category failed" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updateData = await categoryModel.findById(req.params.id);

    if (!updateData) {
      res.status(404).json({ error: "Data not found" });
    } else {
      updateData.name = req.body.name;
      updateData.url = req.body.url;
      updateData.category = req.body.category;
      await updateData.save();

      res
        .status(200)
        .json({ updateData, message: "Category updated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleteData = await categoryModel.deleteOne({ _id: req.params.id });

    if (deleteData?.deletedCount === 1) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  showCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
