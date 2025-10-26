import React from "react";
import ViewAll from "../ui/ViewAll";
import { useGetPostWithCategoryQuery } from "../../../features/api/apiSlice";
import Card from "../ui/Card";

const BusinessSection = () => {
  const { data: businessPosts } = useGetPostWithCategoryQuery("business");
  const businessPost = businessPosts?.data
    ? [...businessPosts.data].sort(() => Math.random() - 0.5).slice(0, 2)
    : [];
  return (
    <div className="mdx:mt-40 space-y-5">
      <ViewAll title={"Business"} url={"business"} />
      <div className="flex flex-col mdx:flex-row">
        {businessPost?.map((post) => (
          <div key={post._id} className="relative group w-full h-full">
            <Card
              post={post}
              tailwindClass=" w-full h-full object-cover "
              absoluteClass="absolute left-[5%] bottom-[5%]"
              titleClass="text-primary"
              dateClass="text-gray-200"
              overlayClass="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessSection;
