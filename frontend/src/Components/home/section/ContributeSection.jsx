import React from "react";

const ContributeSection = () => {
  return (
    <div className="bg-secondary p-5 xs:p-10 mdx:px-30 mdx:py-20 text-start space-y-5">
      <h3 className="text-3xl mdx:text-4xl font-bold text-white">
        Join Our Community of Innovators
      </h3>
      <p className="text-white">
        Share your insights and expertise on various topics with our global
        audience.
      </p>
      <button className="bg-primary text-tertiary hover:bg-tertiary hover:text-primary font-medium cursor-pointer px-6 py-2.5">
        Contribute Your Story
      </button>
    </div>
  );
};

export default ContributeSection;
