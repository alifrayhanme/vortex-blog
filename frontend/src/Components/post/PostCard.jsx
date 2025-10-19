// external import
import React from "react";

// internal import

const PostCard = ({ post }) => {
  const { banner, category, title, description, date } = post;

  return (
    <div className="space-y-3">
      <div>
        <img src={banner} alt="post banner" />
      </div>
      <div className="text-secondary uppercase font-medium text-xs">
        {category}
      </div>
      <div className="font-semibold text-xl">{title}</div>
      <div className="font-medium text-xs">{date}</div>
      <div className="font-light">{description}</div>
    </div>
  );
};

export default PostCard;
