import React from "react";
import { Link } from "react-router";
import { useGetLatestPostsQuery } from "../../features/api/apiSlice";

export const RecentPosts = () => {
  const { data, isError, isLoading, error } = useGetLatestPostsQuery(5);

  if (isError)
    return <div className="text-red-500">Error: {error?.message}</div>;
  if (isLoading) return <div className="text-gray-500">Loading...</div>;

  const posts = data?.data || [];
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-3">
      <h3 className="text-3xl font-bold">Recent Posts</h3>
      <div className="space-y-2 text-secondary">
        {recentPosts.map((post) => (
          <Link 
            key={post._id} 
            to={`/post/${post._id}`}
            className="block text-lg hover:text-red-700 transition-colors cursor-pointer"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
