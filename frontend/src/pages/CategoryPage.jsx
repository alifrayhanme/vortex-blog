import React from "react";
import { useParams } from "react-router";
import Page from "./page";
import { useGetPostsQuery } from "../features/api/apiSlice";

const CategoryPage = () => {
  const params = useParams();
  console.log(params);
  const { data, isError, isLoading, error } = useGetPostsQuery();

  if (isError) return <div className="p-5 text-center text-red-500">Error: {error?.message}</div>;

  // Get category from URL path
  const category = params.category || window.location.pathname.slice(1);
  
  console.log(category);

  if (!category) return <div className="p-5 text-center">Category not found</div>;

  const posts = data?.data || [];
  const categoryPosts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Page
      posts={categoryPosts}
      title={categoryTitle}
      isLoading={isLoading}
    />
  );
};

export default CategoryPage;