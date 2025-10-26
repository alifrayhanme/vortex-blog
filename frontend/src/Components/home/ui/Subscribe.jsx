import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-secondary xxs:p-10 p-5 text-primary flex flex-col h-full">
      <p className="font-semibold text-sm uppercase">Never miss a headline!</p>
      <h2 className="text-xl xxs:text-3xl font-bold xxs:my-8 my-3.5">
        Subscribe to our newsletter for daily updates.
      </h2>
      <p className="">
        Get the latest stories delivered straight to your inbox.
      </p>
      <input type="email" placeholder="email@example.com" className="px-5 py-2.5 bg-primary text-gray-800 outline-none border-none my-2.5" />
      <button className="bg-tertiary hover:bg-primary hover:text-tertiary px-5 py-2.5">
        Subscribe
      </button>
    </div>
  );
};

export default Subscribe;
