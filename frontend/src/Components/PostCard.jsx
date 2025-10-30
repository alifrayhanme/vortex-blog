import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  useGetLikesQuery,
  useToggleLikeMutation,
} from "../features/api/apiSlice";

const PostCard = ({ post }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { data: likes } = useGetLikesQuery(post._id);
  const [toggleLike] = useToggleLikeMutation();

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to like posts");
      return;
    }
    
    try {
      await toggleLike({ postId: post._id, liker_id: user.id }).unwrap();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const isLiked = likes?.data?.some(like => like.liker_id === user?.id);
  const likeCount = likes?.data?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={post.image_url || "/assets/default-post-image.webp"}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-indigo-600 font-medium">{post.category}</span>
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          <Link to={`/post/${post._id}`} className="hover:text-indigo-600">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content.substring(0, 150)}...
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? "text-red-500" : "text-gray-500"
              } hover:text-red-500`}
            >
              <svg
                className="w-5 h-5"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likeCount}</span>
            </button>
          </div>
          
          <Link
            to={`/post/${post._id}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;