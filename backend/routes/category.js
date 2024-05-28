const express = require("express");
const { isLoggedIn } = require("../middleware/is-loggedin.js");
const {
  showCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category-controller.js");

const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/show-categories", showCategories);

router.post(
  "/add-category",
  [
    check("name").notEmpty().withMessage("Name is required"),
  ],
  isLoggedIn,
  addCategory
);

router.put(
  "/update-category/:id",

  [
    check("name").notEmpty().withMessage("Title is required"),
  ],
  isLoggedIn,
  updateCategory
);

router.delete("/delete-category/:id", isLoggedIn, deleteCategory);

module.exports = router;
