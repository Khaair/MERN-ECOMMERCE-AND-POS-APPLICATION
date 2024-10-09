import { mixed, object, string } from "yup";

export const CategorySchema = object().shape({
  name: string().required("Category name is required"),
  url: mixed().required("Image url required"),
});
