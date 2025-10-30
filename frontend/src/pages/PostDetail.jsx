import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  useGetPostQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useGetLikesQuery,
  useToggleLikeMutation,
} from "../features/api/apiSlice";
import { capitalizeName } from "../utils/nameUtils";

const PostDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");

  const { data: post, isLoading: postLoading } = useGetPostQuery(id);
  const { data: comments } = useGetCommentsQuery(id);
  const { data: likes } = useGetLikesQuery(id);
  const [addComment, { isLoading: addingComment }] = useAddCommentMutation();
  const [toggleLike] = useToggleLikeMutation();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please sign in to comment");
      return;
    }
    
    try {
      await addComment({
        postId: id,
        commentor_id: user.id,
        comment,
      }).unwrap();
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to like posts");
      return;
    }
    
    try {
      await toggleLike({ postId: id, liker_id: user.id }).unwrap();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  if (postLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post?.data) {
    return <div className="min-h-screen flex items-center justify-center">Post not found</div>;
  }

  const isLiked = likes?.data?.some(like => like.liker_id === user?.id);
  const likeCount = likes?.data?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={post.data.image_url || "/assets/default-post-image.webp"}
            alt={post.data.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-indigo-600 font-medium">{post.data.category}</span>
              <span className="text-sm text-gray-500">
                {new Date(post.data.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.data.title}</h1>
            
            {post.data.author && (
              <div className="flex items-center mb-6">
                <img
                  className="h-10 w-10 rounded-full"
                  src={post.data.author.picture_url}
                  alt={post.data.author.name}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{capitalizeName(post.data.author.name)}</p>
                  <p className="text-sm text-gray-500">{post.data.author.email}</p>
                </div>
              </div>
            )}
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.data.content}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isLiked
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
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
                <span>{likeCount} Likes</span>
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg mt-8 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
          
          {isAuthenticated && (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                required
              />
              <button
                type="submit"
                disabled={addingComment}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {addingComment ? "Adding..." : "Add Comment"}
              </button>
            </form>
          )}
          
          <div className="space-y-4">
            {comments?.data?.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
              comments?.data?.map((comment) => (
                <div key={comment._id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {comment.commentor_id?.name?.charAt(0) || "A"}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {capitalizeName(comment.commentor_id?.name) || "Anonymous"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;