import React from "react";
import { Link } from "react-router";

const Categories = () => {
  const categories = [
    "World",
    "Politics",
    "Business",
    "Science",
    "Health",
    "Sports",
    "Arts",
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-3xl font-bold">Categories</h3>
      <div className="space-y-2 text-secondary">
        {categories.map((category, index) => (
          <Link to={`/${category.toLowerCase()}`} key={index} className="text-lg block">{category}</Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;