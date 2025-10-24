import React, { useState } from "react";
import Page from "./page";

const Business = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const businessPosts = [
    {
      id: 1,
      banner: "/business-post-banner.jpg",
      category: "Business",
      title: "The Rise of Remote Work: Transforming Modern Business",
      description: "The COVID-19 pandemic accelerated a workplace revolution that was already underway. Remote work has become a fundamental aspect of modern business operations...",
      date: "January 10, 2025",
    },
    {
      id: 2,
      banner: "/business-post-banner.jpg",
      category: "Business",
      title: "Digital Transformation in Small Businesses",
      description: "Small businesses are embracing digital tools to compete in the modern marketplace and improve efficiency.",
      date: "January 8, 2025",
    },
    {
      id: 3,
      banner: "/business-post-banner.jpg",
      category: "Business",
      title: "Sustainable Business Practices for 2025",
      description: "Companies are adopting eco-friendly practices to meet consumer demands and regulatory requirements.",
      date: "January 5, 2025",
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
      const filtered = businessPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  };

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : businessPosts;

  return (
    <Page
      posts={postsToShow}
      recentPosts={recentPostsTitle}
      categories={categoriesByPost}
      title="Business"
      onSearch={handleSearch}
    />
  );
};

export default Business;
