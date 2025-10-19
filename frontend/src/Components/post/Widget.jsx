import React from "react";

const Widget = ({ data }) => {
  return (
    <div className="space-y-5">
      <div className="text-3xl font-bold">Recent Posts</div>
      <div className="space-y-2.5 text-brand">
        {data.map((post, index) => (
          <div key={index}>{post}</div>
        ))}
      </div>
    </div>
  );
};

export default Widget;
