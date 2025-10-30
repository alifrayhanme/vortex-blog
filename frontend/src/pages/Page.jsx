// external import
import React from "react";
import PostCard from "../Components/post/PostCard";
import Search from "../Components/post/Search";
import { RecentPosts } from "../Components/post/RecentPosts";
import Categories from "../Components/post/Categories";

const Page = ({
  posts = [],
  title,
  isLoading = false,
  isError = false,
  error = null,
}) => {
  return (
    <div className="flex flex-col mdx:flex-row gap-10 mt-14 p-5 max-w-7xl mx-auto">
      <div className="flex-1 space-y-5 border-r pr-10">
        <h2 className="text-3xl font-bold">{title}</h2>
        <hr />
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-10">
          {isError ? (
            <p className="text-red-500">{error?.message || "An error occurred"}</p>
          ) : isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-gray-500">No posts available</p>
          )}
        </div>
      </div>

      <div className="w-full mdx:w-80 space-y-5">
        <Search />
        <RecentPosts />
        <Categories />
      </div>
    </div>
  );
};

export default Page;
