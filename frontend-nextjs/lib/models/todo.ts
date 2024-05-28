import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});


export const Category = mongoose.models?.Todo || mongoose.model("Todo", todoSchema);
