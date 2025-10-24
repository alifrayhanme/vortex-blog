import React from "react";

const PostCard = ({ post }) => {
  const { image_url, category, title, content, updatedAt } = post;
  
  const extractText = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || '';
    return text.length > 200 ? text.slice(0, 200) + '...' : text;
  };

  return (
    <div className="space-y-3">
      <img src={image_url} alt={title} className="w-full" />
      <div className="text-secondary uppercase text-xs font-medium">{category}</div>
      <h3 className="font-semibold text-xl">{title}</h3>
      <div className="text-xs text-gray-500">{new Date(updatedAt).toLocaleDateString()}</div>
      <p className="text-gray-700">{extractText(content)}</p>
    </div>
  );
};

export default PostCard;
