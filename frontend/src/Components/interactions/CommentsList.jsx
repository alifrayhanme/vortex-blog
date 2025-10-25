import React from "react";
import { FiUser } from "react-icons/fi";

const CommentsList = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-gray-800">
                  {comment.commentor_id?.name || "Anonymous"}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;