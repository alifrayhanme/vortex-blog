import React from "react";
import { FiSend, FiUser } from "react-icons/fi";

const AddComment = ({ newComment, setNewComment, onSubmit }) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <FiUser className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a thoughtful comment..."
            className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            rows="3"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={onSubmit}
              disabled={!newComment.trim()}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <FiSend className="w-4 h-4" />
              <span>comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;