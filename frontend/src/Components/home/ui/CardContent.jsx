import { useNavigate } from "react-router";

const CardContent = ({ post, row = false }) => {
  const navigate = useNavigate();
  if (!post) return null;

  return (
    <div
      className={`flex ${row ? "flex-row" : "flex-col"} gap-3`}
      onClick={() => navigate(`/post/${post._id}`)}
    >
      <img
        src={post.image_url}
        alt={post.title}
        className={`object-cover cursor-pointer ${
          row ? "w-1/2 h-auto" : "h-auto w-full"
        }`}
      />
      <div>
        <div className="space-y-2.5">
          <span className="text-xs font-semibold uppercase text-primary bg-secondary px-1 py-0.5">
            {post.category}
          </span>
          <h3 className="font-semibold xs:text-2xl text-xl">{post.title}</h3>
          <p className="text-sm text-gray-600">
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardContent;
