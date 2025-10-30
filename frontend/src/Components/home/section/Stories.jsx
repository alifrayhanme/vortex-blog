import { useGetPostWithCategoryQuery } from "../../../features/api/apiSlice";
import CardImage from "../ui/CardImage";
import CardContent from "../ui/CardContent";

const Stories = () => {
  const {
    data: sciencePosts,
    isLoading,
    isError,
    error,
  } = useGetPostWithCategoryQuery("science");
  const { data: worldPosts } = useGetPostWithCategoryQuery("world");
  const { data: arts } = useGetPostWithCategoryQuery("arts");

  const sciencePost = sciencePosts?.data
    ? [...sciencePosts.data].sort(() => Math.random() - 0.5).slice(0, 1)
    : [];

  const worldPost = worldPosts?.data
    ? [...worldPosts.data].sort(() => Math.random() - 0.5).slice(0, 1)
    : [];

  const artsPost = arts?.data
    ? [...arts.data].sort(() => Math.random() - 0.5).slice(0, 1)
    : [];

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-1.5">
          <div className="h-8 w-0.5 bg-secondary"></div>
          <p>Top Stories</p>
          <hr className="flex-1 border-gray-600" />
        </div>
      </div>
      <div>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error?.message}</div>}
        {!isLoading &&
          !isError &&
          sciencePost?.map((post) => (
            <div key={post._id}>
              <CardImage post={post} />
            </div>
          ))}
      </div>
      <div className="flex flex-col mdx:flex-row gap-5">
        <div>
          {worldPost?.map((post) => (
            <div key={post._id}>
              <CardContent post={post} />
            </div>
          ))}
        </div>
        <div>
          {artsPost?.map((post) => (
            <div key={post._id}>
              <CardContent post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
