const express = require("express");
const { isLoggedIn } = require("../middleware/is-loggedin.js");
const {
  showProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products-controller.js");

const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/show-products", showProducts);

router.post(

  "/add-product",
  [
    check("name").notEmpty().withMessage("name is required"),
    check("description").notEmpty().withMessage("description is required"),
    check("price").notEmpty().withMessage("price is required"),
    check("category").notEmpty().withMessage("category is required"),
  ],
  addProduct,

);

router.put(
  "/update-product/:id",
  [
    check("name").notEmpty().withMessage("name is required"),
    check("description").notEmpty().withMessage("description is required"),
    check("price").notEmpty().withMessage("price is required"),
    check("category").notEmpty().withMessage("category is required"),
  ],
  updateProduct
);

router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
