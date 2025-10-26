import { Link } from "react-router";

const Card = ({
  post,
  tailwindClass = " xxs:w-1/2 w-full ",
  absoluteClass = " ",
  titleClass = " ",
  dateClass = " text-gray-600 ",
  overlay = "false",
}) => {
  // const navigate = useNavigate();
  return (
    <>
      {overlay ? (
        <Link to={`/post/${post._id}`} className="w-full h-full cursor-pointer">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        </Link>
      ) : (
        <Link to={`/post/${post._id}`}>
          <img
            src={post.image_url}
            alt={post.title}
            className={`h-auto object-cover cursor-pointer ${tailwindClass}`}
          />
        </Link>
      )}

      <div className={`space-y-2.5 ${absoluteClass} }`}>
        <span className="text-xs font-semibold uppercase text-primary bg-secondary px-1 py-0.5 ">
          {post.category}
        </span>
        <h3 className={`font-semibold xs:text-2xl text-xl ${titleClass} `}>
          {post.title}
        </h3>
        <p className={`text-sm ${dateClass} `}>
          {new Date(post.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </>
  );
};

export default Card;
