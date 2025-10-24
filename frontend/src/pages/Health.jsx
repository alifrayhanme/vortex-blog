import React from "react";
import Page from "./page";

const Health = () => {
  const healthPosts = [
    {
      id: 1,
      banner: "/health-post-banner.jpg",
      category: "health",
      title: "The Future of Artificial Intelligence in Healthcare",
      description: "Artificial Intelligence is transforming healthcare at an unprecedented pace. From diagnostic imaging to personalized treatment plans, AI is revolutionizing how we approach medical care...",
      date: "January 15, 2025",
    },
    {
      id: 2,
      banner: "/health-post-banner.jpg",
      category: "health",
      title: "10 Tips for Better Mental Health",
      description: "Discover effective strategies to improve your mental wellbeing and reduce stress in daily life.",
      date: "January 12, 2025",
    },
    {
      id: 3,
      banner: "/health-post-banner.jpg",
      category: "health",
      title: "Benefits of Regular Exercise",
      description: "Learn about the physical and mental benefits of maintaining a consistent exercise routine.",
      date: "January 10, 2025",
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
    "World (45)",
    "Politics (32)",
    "Business (28)",
    "Science (21)",
    "Health (19)",
    "Sports (35)",
    "Arts (16)",
  ];




  return (
    <Page
      posts={healthPosts}
      recentPosts={recentPostsTitle}
      categories={categoriesByPost}
      title="Health"
    />
  );
};

export default Health;
