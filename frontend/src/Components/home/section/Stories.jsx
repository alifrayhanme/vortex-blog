import React from "react";
import { Link } from "react-router";
import { useGetPostWithCategoryQuery } from "../../../features/api/apiSlice";
import Card from "../ui/Card";
import Subscribe from "../ui/Subscribe";

const Stories = () => {
  const {
    data: sciencePosts,
    isLoading,
    isError,
    error,
  } = useGetPostWithCategoryQuery("science");
  const { data: worldPosts } = useGetPostWithCategoryQuery("world");
  const { data: arts } = useGetPostWithCategoryQuery("arts");

  const sciencePost = sciencePosts?.data
    ? [...sciencePosts.data].sort(() => Math.random() - 0.5).slice(0, 1)
    : [];

  const worldPost = worldPosts?.data
    ? [...worldPosts.data].sort(() => Math.random() - 0.5).slice(0, 1)
    : [];

    const artsPost = arts?.data
    ? [...arts.data].sort(() => Math.random() - 0.5).slice(0, 1)
    : [];

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-1.5">
          <div className="h-8 w-0.5 bg-secondary"></div>
          <p>Top Stories</p>
          <hr className="flex-1 border-gray-600" />
        </div>
      </div>
      <div className="grid grid-cols-1 mdx:grid-cols-3 gap-5">
        <div className="mdx:col-span-2 col-span-1">
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: {error?.message}</div>}
          {!isLoading &&
            !isError &&
            sciencePost?.map((post) => (
              <div key={post._id} className="relative w-full h-full">
                <Card
                  post={post}
                  tailwindClass=" w-full h-full object-cover "
                  absoluteClass="absolute left-[5%] bottom-[5%]"
                  titleClass="text-primary"
                  dateClass="text-gray-200"
                />
              </div>
            ))}
        </div>
        <div className="col-span-1 h-full">
          <Subscribe />
        </div>
      </div>
      <div className="flex flex-col mdx:flex-row gap-5">
        <div>
          {worldPost?.map((post) => (
            <div key={post._id} className="w-full h-full space-y-5">
              <Card post={post} tailwindClass=" w-full h-full object-cover " />
            </div>
          ))}
        </div>
        <div>
          {artsPost?.map((post) => (
            <div key={post._id} className="w-full h-full space-y-5">
              <Card post={post} tailwindClass=" w-full h-full object-cover " />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
