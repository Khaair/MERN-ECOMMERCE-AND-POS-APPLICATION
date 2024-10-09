const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category", // Reference to the Category model
    required: true,
  },
});

const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;
