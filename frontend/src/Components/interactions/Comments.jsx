import React from "react";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";

const Comments = ({ commentCount, showComments, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
        showComments
          ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
          : "bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200"
      }`}
    >
      {showComments ? (
        <FaCommentDots className="w-5 h-5" />
      ) : (
        <FaRegCommentDots className="w-5 h-5" />
      )}
      <span className="font-medium">{commentCount}</span>
    </button>
  );
};

export default Comments;