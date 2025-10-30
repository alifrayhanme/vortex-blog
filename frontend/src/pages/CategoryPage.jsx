import React from "react";
import Page from "./Page";
import { useGetPostWithCategoryQuery } from "../features/api/apiSlice";

const CategoryPage = () => {
  const category = window.location.pathname.slice(1);
  

  const {
    data: categoryData,
    isError,
    isLoading,
    error,
  } = useGetPostWithCategoryQuery(category);

  const categoryPosts = categoryData?.data || [];
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Page posts={categoryPosts} title={categoryTitle} isLoading={isLoading} isError={isError} error={error} />
  );
};

export default CategoryPage;
