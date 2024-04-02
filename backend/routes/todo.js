const express = require("express");
const { isLoggedIn } = require("../middleware/is-loggedin.js");
const {
  showTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo-controller.js");

const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/show-todos", isLoggedIn, showTodos);

router.post(
  "/add-todo",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
  ],
  isLoggedIn,
  addTodo
);

router.put(
  "/update-todo/:id",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
  ],
  isLoggedIn,
  updateTodo
);

router.delete("/delete-todo/:id", isLoggedIn, deleteTodo);

module.exports = router;
