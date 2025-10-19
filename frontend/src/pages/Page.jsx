// external import
import React, { useEffect, useRef, useState } from "react";

// internal import
import PostCard from "../Components/post/PostCard";
import Search from "../Components/post/Search";
import Widget from "../Components/post/Widget";

const Page = ({
  posts = [],
  recentPosts = [],
  categories = [],
  title,
  onSearch,
}) => {
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const contentHeight = contentRef.current?.offsetHeight || 0;
      const sidebarHeight = sidebarRef.current?.offsetHeight || 0;
      setHeight(Math.max(contentHeight, sidebarHeight));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [posts, recentPosts, categories]);

  return (
    <div className="flex flex-col mdx:flex-row justify-between items-start gap-10 mt-14 p-5 max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="space-y-5" ref={contentRef}>
        <h2 className="text-3xl font-bold">{title}</h2>
        <hr />
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard key={post.id || index} post={post} />
            ))
          ) : (
            <p className="text-gray-500">No posts available</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr
        style={{ height: `${height}px` }}
        className="w-px bg-text border-0 mx-4 hidden mdx:block"
      />

      {/* Sidebar */}
      <div className="space-y-5" ref={sidebarRef}>
        <Search onSearch={onSearch} />
        <div className="grid grid-cols-1 xs:grid-cols-2 mdx:grid-cols-1 gap-5">
          {recentPosts.length > 0 && (
            <Widget title="Recent Posts" data={recentPosts} />
          )}
          {categories.length > 0 && (
            <Widget title="Categories" data={categories} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
