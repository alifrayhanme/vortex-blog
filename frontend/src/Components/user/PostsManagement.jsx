import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router";

const PostsManagement = ({ userType, posts}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {userType === "admin"
            ? "All Posts Management"
            : userType === "moderator"
            ? "Moderated Posts"
            : "My Posts"}
        </h2>
        <div className="flex gap-2">
          {userType === "admin" && (
            <Link
              to="/user?type=user"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              View as User
            </Link>
          )}
          <Link
            to="/create-post"
            className="bg-secondary text-white px-4 py-2 rounded-lg active:bg-red-700"
          >
            Create New Post
          </Link>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <div className="flex gap-4 text-sm text-gray-500 items-center">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    <FaEye size={12} /> {post.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEdit size={12} /> {post.comment} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <AiOutlineLike size={12} /> {post.like} likes
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-tertiary active:bg-gray-100 p-2">
                  <FaEdit size={16} />
                </button>
                <button className="text-secondary active:text-red-700 p-2">
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No posts yet. Create your first post!</p>
        </div>
      )}
    </div>
  );
};

export default PostsManagement;
