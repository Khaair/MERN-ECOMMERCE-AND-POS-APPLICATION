const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await User.findOne({ username });
      const existingEmail = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ status: 400, message: "Username already exists" });
      }
      if (existingEmail) {
        return res
          .status(400)
          .json({ status: 400, message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();

      res
        .status(200)
        .json({ status: 200, message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User name not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, "khaair", {
      expiresIn: "0.08h",
    });

    res.status(200).json({ role: user.role, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/verify-user", async (req, res) => {
  try {
    const { email } = req.body;

    const emailData = await User.findOne({ email });

    console.log("emailData", emailData);

    if (!emailData) {
      return res.status(401).json({ message: "Email not found" });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "Email verified successfully" });
    }
  } catch (err) {}
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const emailFetchData = await User.findOne({ email });

    console.log("emailFetchData", emailFetchData);

    if (!emailFetchData) {
      return res.status(401).json({ message: "Email not found" });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      emailFetchData.password = hashedPassword;

      await emailFetchData.save();

      res
        .status(200)
        .json({ status: 200, message: "Password changed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/update-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const emailData = await User.findOne({ email });

    if (!emailData) {
      return res.status(401).json({ message: "Email not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      emailData.password
    );

    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const todo = await User.findOne({ email });

    if (!todo) {
      res.status(404).json({ error: "Data not found" });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      todo.password = hashedPassword;

      await todo.save();

      res.status(200).json({ todo, message: "Todo updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
