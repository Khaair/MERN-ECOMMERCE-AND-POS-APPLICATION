import { baseUrl } from "../utils/api-url";
import { token } from "../utils/auth";
import { getPage } from "../utils/getPage";
import axios from "axios";

export const fetchAdminCategoryListHandler = async (
    limit: number,
    locationsearch: string
  ) => {
    const res = await axios.get(
      `${baseUrl}/category/show-categories?page=${
        getPage(locationsearch) || 1
      }&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    return res;
  };


  export const addAdminCategoryHandler = async (fields: any) => {
    const res = await fetch(
      `${baseUrl}/category/add-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(fields),
      }
    );
    return await res;
  };
