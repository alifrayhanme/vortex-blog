import React from "react";
import { Link } from "react-router";
import { FaLongArrowAltRight } from "react-icons/fa";

const ViewAll = ({ title, url }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-8 w-0.5 bg-secondary"></div>
      <p>{title}</p>
      <hr className="flex-1 border-gray-600" />
      <Link to={`/${url}`} className="text-secondary font-semibold">
        View All
      </Link>
      <FaLongArrowAltRight className="text-secondary" />
    </div>
  );
};

export default ViewAll;
