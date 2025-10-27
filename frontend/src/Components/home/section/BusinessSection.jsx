import React from "react";
import ViewAll from "../ui/ViewAll";
import { useGetPostWithCategoryQuery } from "../../../features/api/apiSlice";
import CardImage from "../ui/CardImage";

const BusinessSection = () => {
  const { data: businessPosts } = useGetPostWithCategoryQuery("business");
  const businessPost = businessPosts?.data
    ? [...businessPosts.data].sort(() => Math.random() - 0.5).slice(0, 2)
    : [];
  return (
    <div className="space-y-5">
      <ViewAll title={"Business"} url={"business"} />
      <div className="flex flex-col mdx:flex-row">
        {businessPost?.map((post) => (
          <div key={post._id} className="cursor-pointer">
            <CardImage
              post={post}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessSection;
