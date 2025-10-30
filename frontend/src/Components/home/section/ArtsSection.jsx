import ViewAll from "../ui/ViewAll";
import { useGetPostWithCategoryQuery } from "../../../features/api/apiSlice";
import CardContent from "../ui/CardContent";

const ArtsSection = () => {
  const { data, isLoading, isError, error } =
    useGetPostWithCategoryQuery("arts");

  const posts = data?.data
    ? [...data.data].sort(() => Math.random() - 0.5).slice(0, 3)
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="space-y-5">
      <ViewAll title="Arts" url="arts" />
      <div className="grid grid-cols-1 md:grid-cols-2 mdx:grid-cols-3 gap-5">
        {posts.map((post) => (
          <div key={post._id}>
            <CardContent post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtsSection;
