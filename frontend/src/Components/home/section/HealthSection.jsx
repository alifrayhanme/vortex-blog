import React from "react";
import ViewAll from "../ui/ViewAll";
import { useGetPostWithCategoryQuery } from "../../../features/api/apiSlice";
import CardContent from "../ui/CardContent";

const HealthSection = () => {
  const { data, isLoading, isError, error } =
    useGetPostWithCategoryQuery("health");

  const posts = data?.data
    ? [...data.data].sort(() => Math.random() - 0.5).slice(0, 4)
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="space-y-5">
      <ViewAll title="Health" url="health" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post) => (
          <div key={post._id} className="flex flex-col space-y-5">
            <CardContent post={post}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthSection;
