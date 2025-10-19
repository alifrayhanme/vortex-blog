import React, { useState } from "react";
import Page from "./page";

const Health = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const healthPosts = [
    {
      id: 1,
      banner: "/health-post-banner.jpg",
      category: "health",
      title: "Breaking Down the Latest Nutritional Guidelines",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis orci consectetur, blandit justo ut, tempor turpis. Vestibulum facilisis condimentum",
      date: "February 24, 2025",
    },
    {
      id: 2,
      banner: "/health-post-banner.jpg",
      category: "health",
      title: "10 Tips for Better Mental Health",
      description:
        "Discover effective strategies to improve your mental wellbeing and reduce stress in daily life.",
      date: "February 20, 2025",
    },
    {
      id: 3,
      banner: "/health-post-banner.jpg",
      category: "health",
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
      const filtered = healthPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  };

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : healthPosts;

  return (
    <Page
      posts={postsToShow}
      recentPosts={recentPostsTitle}
      categories={categoriesByPost}
      title="Health"
      onSearch={handleSearch}
    />
  );
};

export default Health;
