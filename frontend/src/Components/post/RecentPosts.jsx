import React from "react";
import { useGetPostsQuery } from "../../features/api/apiSlice";

export const RecentPosts = () => {
  const { data, isError, isLoading, error } = useGetPostsQuery();

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
          <div key={post._id} className="text-lg">
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
};
