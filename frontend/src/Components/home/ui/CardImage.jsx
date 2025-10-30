import { useNavigate } from "react-router";

const CardImage = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/post/${post._id}`)}>
      <div className="relative w-full h-full">
        <div className="w-full h-full cursor-pointer">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2.5 absolute bottom-[5%] left-[5%]">
          <span className="text-xs font-semibold uppercase text-primary bg-secondary px-1 py-0.5 ">
            {post.category}
          </span>
          <h3 className="font-semibold xs:text-2xl text-xl text-primary">
            {post.title}
          </h3>
          <p className="text-sm text-gray-200">
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

export default CardImage;
