import React from "react";
import { useParams } from "react-router";
import { useGetPostQuery } from "../features/api/apiSlice";
import LikeComments from "../Components/interactions/LikeComments";
import { capitalizeName } from "../utils/nameUtils";

const PostDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPostQuery(id);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">Failed to load post</div>
    );
  if (!data?.data)
    return <div className="text-center py-8">Post not found</div>;

  const post = data.data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-1 mb-6 text-gray-600 text-sm">
          <span>
            By
            <span className="pl-1">
              {capitalizeName(post.author?.name) || "Unknown Author"}
            </span>
          </span>

          <span>/</span>

          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>


        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-auto object-cover mb-6"
        />


        <div 
          className="prose max-w-none space-y-5 text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <LikeComments postId={id} />
    </div>
  );
};

export default PostDetails;
