import React, { useState } from "react";
import Page from "./page";

const Science = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const sciencePosts = [
    {
      id: 1,
      banner: "/science-post-banner.jpg",
      category: "Science",
      title: "Climate Change: Understanding the Global Impact",
      description: "Climate change represents one of the most pressing challenges of our time. The scientific evidence is clear: human activities are driving unprecedented changes in Earth's climate system...",
      date: "January 12, 2025",
    },
    {
      id: 2,
      banner: "/science-post-banner.jpg",
      category: "Science",
      title: "Breakthrough in Quantum Computing",
      description: "Scientists have achieved a major milestone in quantum computing that could revolutionize technology.",
      date: "January 9, 2025",
    },
    {
      id: 3,
      banner: "/science-post-banner.jpg",
      category: "Science",
      title: "Space Exploration: Mars Mission Updates",
      description: "Latest developments in the ongoing Mars exploration missions and future plans for human settlement.",
      date: "January 6, 2025",
    },
  ];

  const recentPostsTitle = [
    "The Future of Artificial Intelligence in Healthcare",
    "Climate Change: Understanding the Global Impact",
    "The Rise of Remote Work: Transforming Modern Business",
    "Breaking News: Major Political Reform Announced",
    "World Cup 2026: Preparations Underway",
  ];

  const categoriesByPost = [
    "World (45)",
    "Politics (32)",
    "Business (28)",
    "Science (21)",
    "Health (19)",
    "Sports (35)",
    "Arts (16)",
  ];

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      const filtered = sciencePosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  };

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : sciencePosts;

  return (
    <Page
      posts={postsToShow}
      recentPosts={recentPostsTitle}
      categories={categoriesByPost}
      title="Science"
      onSearch={handleSearch}
    />
  );
};

export default Science;
