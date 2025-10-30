import React from "react";
import { Link } from "react-router";
import { useGetLatestPostsQuery } from "../../../features/api/apiSlice";
import CardImage from "../ui/CardImage";
import CardContent from "../ui/CardContent";

const HeroSection = () => {
  const { data, isLoading, isError, error } = useGetLatestPostsQuery(5);
  const posts = data?.data
    ? [...data.data].sort(() => Math.random() - 0.5).slice(0, 3)
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="grid grid-cols-1 mdx:grid-cols-2 gap-5">
      {/* Left side - Single post */}
      {posts[0] && <CardImage post={posts[0]} />}

      {/* Right side - Two posts */}
      <div className="flex flex-col justify-between gap-5">
        {posts.slice(1, 3).map((post) => (
          <CardContent key={post._id} post={post} row={true} />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
