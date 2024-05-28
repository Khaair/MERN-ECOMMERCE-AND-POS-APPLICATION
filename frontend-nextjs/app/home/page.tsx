"use client";

import CarouselEx from "@/components/front-office/carosol";
import CategoriesContainer from "@/components/front-office/categories";
import Layout from "@/components/front-office/layout";
import ProductsContainer from "@/components/front-office/products";
import { fetchAdminBlogListHandler } from "@/services/todo/todo";
import React, { useCallback, useEffect, useState } from "react";

const HomeContainer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [getallCategories, setallCategories] = useState<any>({
    loading: false,
    data: null,
  });

  const fetchBlogs: () => Promise<void> = useCallback(async () => {
    if (true) {
      await setallCategories({ loading: true, data: null });
      await fetchAdminBlogListHandler().then((res) => {
        if (res?.status === 200) {
          setallCategories({
            loading: false,
            data: res?.data?.data,
          });
        } else {
          setallCategories({
            loading: false,
            data: null,
          });
        }
      });
    }
  }, []);
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBlogs]);

  return (
    <Layout>
      <CarouselEx />
      <CategoriesContainer getallCategories={getallCategories} />
      {getallCategories?.data?.map((item: any, index: any) => {
        return (
          <div key={index}>
            <ProductsContainer item={item} />
          </div>
        );
      })}
    </Layout>
  );
};

export default HomeContainer;
