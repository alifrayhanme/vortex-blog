const Search = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold">Search</h3>
      <div className="flex gap-1.5">
        <input
          className="py-1.5 px-3.5 border outline-none rounded-sm flex-1"
          type="search"
          placeholder="Search posts..."
        />
        <button className="bg-tertiary text-primary active:bg-gray-800 py-1.5 px-3.5">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
