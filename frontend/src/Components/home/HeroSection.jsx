import React from "react";
import { useGetLatestPostsQuery } from "../../features/api/apiSlice";

const HeroSection = () => {
  const { data, isLoading, isError, error } = useGetLatestPostsQuery(5);
  const posts = data?.data
    ? [...data.data].sort(() => Math.random() - 0.5).slice(0, 3)
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="grid grid-cols-1 mdx:grid-cols-2 gap-4 px-5 py-10">
      {/* Left side - Single post */}
      {posts[0] && (
        <div className="relative group cursor-pointer">
          <div className="w-full h-full">
            <img
              src={posts[0].image_url}
              alt={posts[0].title}
              className="w-full h-full object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>

          <div className="mt-5 space-y-2.5 absolute bottom-[10%] left-[10%] z-10">
            <span className="text-xs font-semibold uppercase text-primary bg-secondary px-1 py-0.5">
              {posts[0].category}
            </span>
            <h3 className="font-semibold text-3xl text-white">
              {posts[0].title}
            </h3>
            <p className="text-gray-200">
              {new Date(posts[0].updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}

      {/* Right side - Two posts */}
      <div className="space-y-4">
        {posts.slice(1, 3).map((post) => (
          <div key={post._id} className="flex gap-3">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-1/2 object-cover"
            />
            <div className="mt-5 space-y-2.5">
              <span className="text-xs font-semibold uppercase text-primary bg-secondary px-1 py-0.5 ">
                {post.category}
              </span>
              <h3 className="font-semibold text-2xl">{post.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
