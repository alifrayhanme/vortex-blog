import React from "react";
import Page from "./Page";
import { useSelector } from "react-redux";

export const SearchResult = () => {
  const { results: searchResults } = useSelector((state) => state.search);

  return (
    <Page
      posts={searchResults || []}
      title={"Search Results"}
      isLoading={false}
    />
  );
};
