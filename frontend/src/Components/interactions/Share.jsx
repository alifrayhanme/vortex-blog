import React from "react";
import { BiShare } from "react-icons/bi";

const Share = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-green-50 hover:text-green-500 hover:border-green-200 transition-all duration-300 transform hover:scale-105"
    >
      <BiShare className="w-5 h-5" />
      <span className="font-medium">Share</span>
    </button>
  );
};

export default Share;