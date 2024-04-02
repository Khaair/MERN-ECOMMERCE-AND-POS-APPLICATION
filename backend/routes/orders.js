const express = require("express");
const { isLoggedIn } = require("../middleware/is-loggedin.js");
const {
  showOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order-controller.js");

const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/show-orders", isLoggedIn, showOrders);

router.post(

  "/add-order",
  [
    check("user").notEmpty().withMessage("User ID is required"),
    check("products.*.product").notEmpty().withMessage("Product ID is required"),
    check("products.*.quantity").notEmpty().withMessage("Quantity is required").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    check("totalAmount").notEmpty().withMessage("Total amount is required").isFloat({ min: 0 }).withMessage("Total amount must be at least 0"),
  ],
  isLoggedIn,
  addOrder,

);

router.put(
  "/update-product/:id",
  [
    check("name").notEmpty().withMessage("name is required"),
    check("description").notEmpty().withMessage("description is required"),
    check("price").notEmpty().withMessage("price is required"),
    check("category").notEmpty().withMessage("category is required"),
  ],
  isLoggedIn,
  updateOrder
);

router.delete("/delete-product/:id", isLoggedIn, deleteOrder);

module.exports = router;
