import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">500</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          We're sorry, but something unexpected happened.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
