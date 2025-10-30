import React from "react";
import CardContent from "../ui/CardContent";
import { useGetPostWithCategoryQuery } from "../../../features/api/apiSlice";
import ViewAll from "../ui/ViewAll";

const SciencePoliticsSection = () => {
  const { data: sciencePosts } = useGetPostWithCategoryQuery("science");
  const { data: politicsPosts } = useGetPostWithCategoryQuery("politics");

  const sciencePost = sciencePosts?.data
    ? [...sciencePosts.data].sort(() => Math.random() - 0.5).slice(0, 1)
    : [];
  const politicsPost = politicsPosts?.data
    ? [...politicsPosts.data].sort(() => Math.random() - 0.5).slice(0, 1)
    : [];

  return (
    <div className="flex gap-5">
      <div className="space-y-5">
        <ViewAll title="Science" url="science" />
        <div>
        {sciencePost.map((post) => (
          <div key={post._id}>
            <CardContent post={post} />
          </div>
        ))}
      </div>
      </div>

      <div className="space-y-5">
        <ViewAll title="Politics" url="politics" />
        <div>
        {politicsPost.map((post) => (
          <div key={post._id}>
            <CardContent post={post} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default SciencePoliticsSection;
