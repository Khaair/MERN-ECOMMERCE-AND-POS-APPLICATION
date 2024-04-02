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
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");




app.use("/api/todos", todoRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
