import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const Like = ({ likeCount, onLike }) => {
  return (
    <button
      onClick={onLike}
      className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
    >
      <AiOutlineHeart className="w-5 h-5" />
      <span className="font-medium">{likeCount}</span>
    </button>
  );
};

export default Like;