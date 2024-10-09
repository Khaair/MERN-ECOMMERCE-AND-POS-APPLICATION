'use strict';
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors());



mongoose.connect("mongodb://localhost:27017/mern-ecommerce-a2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

const todoRouter = require("./routes/todo");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const subCategoryRouter = require("./routes/sub-category");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");




app.use("/api/todos", todoRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/sub-category", subCategoryRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//live api url: https://pos-app-navy.vercel.app
//local data base: mongodb://localhost:27017/mern-ecommerce-a2
//live data base: mongodb+srv://khaircseiu:n1JXHzaQa1YxUwij@cluster0.gkfcnxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//local api url: http://localhost:5000