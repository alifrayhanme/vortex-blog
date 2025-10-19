import React, { useState } from "react";
import Page from "./page";

const Sports = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const sportsPosts = [
    {
      id: 1,
      banner: "/sports-post-banner.jpg",
      category: "Sports",
      title: "Olympics 2025: The Cyclists to Watch",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis orci consectetur, blandit justo ut, tempor turpis. Vestibulum facilisis condimentum",
      date: "February 24, 2025",
    },
    {
      id: 2,
      banner: "/sports-post-banner.jpg",
      category: "Sports",
      title: "10 Tips for Better Mental Health",
      description:
        "Discover effective strategies to improve your mental wellbeing and reduce stress in daily life.",
      date: "February 20, 2025",
    },
    {
      id: 3,
      banner: "/sports-post-banner.jpg",
      category: "Sports",
      title: "Benefits of Regular Exercise",
      description:
        "Learn about the physical and mental benefits of maintaining a consistent exercise routine.",
      date: "February 18, 2025",
    },
  ];

  const recentPostsTitle = [
    "Olympics 2025: The Cyclists to Watch",
    "The Top Film Festivals Showcasing Emerging Talent",
    "How Virtual Reality is Revolutionizing the Art World",
    "Understanding the Evolution of Digital Art Marketplaces",
    "Understanding Voter Turnout Trends in Democratic Elections",
  ];

  const categoriesByPost = [
    "Arts (4)",
    "Business (2)",
    "Health (5)",
    "Politics (2)",
    "Science (2)",
    "Sports (2)",
    "World (4)",
  ];

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      const filtered = sportsPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  };

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : sportsPosts;

  return (
    <Page
      posts={postsToShow}
      recentPosts={recentPostsTitle}
      categories={categoriesByPost}
      title="Sports"
      onSearch={handleSearch}
    />
  );
};

export default Sports;
