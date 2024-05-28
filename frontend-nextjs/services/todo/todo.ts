import { baseUrl } from "@/utils/api-url";
import axios from "axios";
// fetch all blogs
export const fetchAdminBlogListHandler = async () => {
  const res = await axios.get(
    `${baseUrl}/category/show-categories`,
  
  );
  return res;
};