import React, { useState } from "react";
import {
  useGetLikesQuery,
  useGetCommentsQuery,
  useAddLikeMutation,
  useAddCommentMutation,
} from "../../features/api/apiSlice";
import { Like, Comments, Share, AddComment, CommentsList } from "./index";

const LikeComments = ({ postId }) => {
  const { data: likesData, isLoading: likesLoading } = useGetLikesQuery(postId);
  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery(postId);
  const [addLike] = useAddLikeMutation();
  const [addComment] = useAddCommentMutation();


  const [localLikeCount, setLocalLikeCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const likes = likesData?.data || [];
  const comments = commentsData?.data || [];
  const currentUserId = "user123";
  
  React.useEffect(() => {
    setLocalLikeCount(likes.length);
  }, [likes.length]);

  const handleLike = async () => {
    // Optimistic update
    setLocalLikeCount(prev => prev + 1);
    
    // Try to save to database
    try {
      await addLike({ postId, liker_id: currentUserId }).unwrap();
      console.log('Like saved to database');
    } catch (error) {
      console.error('Failed to save like to database:', error);
      // Rollback on error
      setLocalLikeCount(prev => prev - 1);
    }
  };

  const handleComment = async () => {
    if (newComment.trim()) {
      try {
        await addComment({
          postId,
          commentor_id: currentUserId,
          comment: newComment,
        }).unwrap();
        setNewComment("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  if (likesLoading || commentsLoading) {
    return <div>Loading likes and comments...</div>;
  }

  return (
    <div className="bg-white mt-10 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Action Bar */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center space-x-6">
          <Like likeCount={localLikeCount} onLike={handleLike} />
          <Comments 
            commentCount={comments.length} 
            showComments={showComments} 
            onToggle={() => setShowComments(!showComments)} 
          />
          <Share />
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-6 bg-gray-50">
          <AddComment 
            newComment={newComment} 
            setNewComment={setNewComment} 
            onSubmit={handleComment} 
          />
          <CommentsList comments={comments} />
        </div>
      )}
    </div>
  );
};

export default LikeComments;
