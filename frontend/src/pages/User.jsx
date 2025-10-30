import React, { useState } from "react";
import { useSearchParams } from "react-router";
import Profile from "../Components/user/Profile";
import PostsManagement from "../Components/user/PostsManagement";
const User = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "user";

  const [user] = useState({
    id: "user_001",
    name: "Alif Rayhan",
    username: "alifrayhan",
    email: "alif@email.com",
    role: "user",
    postsCount: 12,
    joinDate: "2025-10-21",
  });
  
  const [posts] = useState([
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Healthcare",
      category: "Health",
      date: "2025-01-15",
      comment: 24,
      like: 156,
      views: 2847,
      imageUrl: "/health-post-banner.jpg",
    },
    {
      id: 2,
      title: "Climate Change: Understanding the Global Impact",
      category: "Science",
      date: "2025-01-12",
      comment: 89,
      like: 342,
      views: 5621,
      imageUrl: "/science-post-banner.jpg",
    },
    {
      id: 3,
      title: "The Rise of Remote Work: Transforming Modern Business",
      category: "Business",
      date: "2025-01-10",
      comment: 67,
      like: 289,
      views: 4156,
      imageUrl: "/business-post-banner.jpg",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto p-5">
      {/* User Profile Section */}
      <Profile className="w-full" userType={userType} user={user} />

      {/* Posts Management Section */}
      <PostsManagement className="w-full" userType={userType} posts={posts} />
    </div>
  );
};

export default User;
