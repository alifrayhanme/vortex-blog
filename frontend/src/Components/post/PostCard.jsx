import React from "react";
import { Link } from "react-router";

const PostCard = ({ post }) => {
  const { _id, image_url, category, title, content, updatedAt } = post;

  const extractText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || "";
    return text.length > 200 ? text.slice(0, 200) + "..." : text;
  };

  return (
    <Link to={`/post/${_id}`}>
      <div className="space-y-3">
        <img src={image_url} alt={title} className="w-full" />
        <div className="text-secondary uppercase text-xs font-medium">
          {category}
        </div>
        <h3 className="font-semibold text-xl">{title}</h3>
        <div className="text-xs text-gray-500">
          {new Date(updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <p className="text-gray-700">{extractText(content)}</p>
      </div>
    </Link>
  );
};

export default PostCard;
