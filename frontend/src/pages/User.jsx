import React, { useState } from "react";
import { useSearchParams } from "react-router";
import Profile from "../Components/user/Profile";
import PostsManagement from "../Components/user/PostsManagement";

const User = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "user";

  const getUserData = () => {
    switch (userType) {
      case "admin":
        return {
          name: "Admin User",
          username: "admin",
          email: "admin@vortexblog.com",
          joinDate: "2024-01-01",
          postsCount: 45,
          role: "Administrator",
        };
      case "moderator":
        return {
          name: "Moderator User",
          username: "moderator",
          email: "mod@vortexblog.com",
          joinDate: "2024-06-15",
          postsCount: 28,
          role: "Moderator",
        };
      default:
        return {
          name: "Alif Rayhan",
          username: "alifrayhan",
          email: "alif@email.com",
          joinDate: "2025-10-21",
          postsCount: 12,
          role: "User",
        };
    }
  };

  const [user] = useState(getUserData());

  const [posts] = useState([
    {
      id: 1,
      title: "My First Blog Post",
      category: "Health",
      date: "2025-10-21",
      comment: 10,
      like: 20,
      views: 150,
    },
    {
      id: 2,
      title: "My Second Blog Post",
      category: "Health",
      date: "2025-10-20",
      comment: 5,
      like: 15,
      views: 189,
    },
    {
      id: 3,
      title: "My Third Blog Post",
      category: "Health",
      date: "2025-10-19",
      comment: 8,
      like: 25,
      views: 204,
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
