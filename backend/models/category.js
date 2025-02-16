const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
