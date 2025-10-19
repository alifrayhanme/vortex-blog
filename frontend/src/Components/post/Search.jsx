import React, { useState } from "react";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    return;
  };

  return (
    <>
      <p>Search</p>
      <div className="space-x-2 mt-1 flex">
        <input
          type="search"
          className="border outline-none py-2 px-4 rounded-sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-text text-background py-2 px-4 font-medium active:bg-gray-900"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
