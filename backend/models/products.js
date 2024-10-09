const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category", // Reference to the Category model
    required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "subCategory", // Reference to the Category model
    required: false,
  },
  brand: String,
  stockQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;
