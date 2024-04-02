const TodoModel = require("../models/todo.js");
const { validationResult } = require("express-validator");

const showTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = {};

    if (search) {
      query = { title: { $regex: new RegExp(search, "i") } };
    }

    const todos = await TodoModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await TodoModel.countDocuments(query);

    res.status(200).json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const todo = new TodoModel(req.body);

    await todo.save();

    res.status(201).json({ todo, message: "Todo added successfully" });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: "Adding new todo failed" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      res.status(404).json({ error: "Data not found" });
    } else {
      todo.title = req.body.title;
      todo.description = req.body.description;

      await todo.save();

      res.status(200).json({ todo, message: "Todo updated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.deleteOne({ _id: req.params.id });

    if (todo?.deletedCount === 1) {
      res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { showTodos, addTodo, updateTodo, deleteTodo };
