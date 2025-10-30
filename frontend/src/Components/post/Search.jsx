import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetPostsQuery } from "../../features/api/apiSlice";
import { setSearchResults, setSearchQuery, clearSearch } from "../../features/search/searchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query } = useSelector((state) => state.search);
  const { data: posts, isLoading } = useGetPostsQuery();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      dispatch(clearSearch());
      return;
    }

    let postsData = posts;
    if (posts?.posts) postsData = posts.posts;
    if (posts?.data) postsData = posts.data;

    if (Array.isArray(postsData)) {
      const result = postsData.filter((post) =>
        post.title?.toLowerCase().includes(query.toLowerCase()) ||
        post.content?.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(setSearchResults(result));
      navigate('/search');
      dispatch(setSearchQuery(''));
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold">Search</h3>
      <form className="flex gap-1.5" onSubmit={handleSearch}>
        <input
          className="py-1.5 px-3.5 border outline-none rounded-sm flex-1"
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-tertiary text-primary active:bg-gray-800 py-1.5 px-3.5 disabled:opacity-50"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default Search;
