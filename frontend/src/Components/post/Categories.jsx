import React from "react";
import { Link } from "react-router";
import { useGetCategoriesQuery } from "../../features/api/apiSlice";

const Categories = () => {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery();

  return (
    <div className="space-y-3">
      <h3 className="text-3xl font-bold">Categories</h3>
      <div className="space-y-2">
        {isLoading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading categories</p>
        ) : (
          categoriesData?.data?.map((data, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <Link
                to={`/${data.category.toLowerCase()}`}
                className="text-lg block text-secondary"
              >
                {data.category}
              </Link>
              <span>({data.posts})</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
