const express = require("express");
const { isLoggedIn } = require("../middleware/is-loggedin.js");
const {
  showCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/sub-category-controller");

const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/show-sub-category", showCategories);

router.post(
  "/add-sub-category",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("url").notEmpty().withMessage("url is required"),
    check("category").notEmpty().withMessage("Category is required"),

  ],
  addCategory
);

router.put(
  "/update-sub-category/:id",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("url").notEmpty().withMessage("url is required"),
    check("category").notEmpty().withMessage("Category is required"),

  ],
  updateCategory
);

router.delete("/delete-sub-category/:id", deleteCategory);

module.exports = router;
