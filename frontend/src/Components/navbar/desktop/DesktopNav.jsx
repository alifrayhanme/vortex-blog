// external import
import React from "react";
import { Link } from "react-router";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

// internal import
import logo from "../../../assets/logo.svg";
import { useAuth } from "../../../hooks/useAuth";

const DesktopNav = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-8">
      <div className="flex justify-center items-center gap-5 ">
        <Link to={"#"} className="hover:text-secondary text-gray-800">
          <FaInstagram size={20} />
        </Link>
        <Link to={"#"} className="hover:text-secondary text-gray-800">
          <FaFacebookF size={20} />
        </Link>

        <Link to={"#"} className="hover:text-secondary text-gray-800">
          <FaLinkedinIn size={20} />
        </Link>
        <Link to={"#"} className="hover:text-secondary text-gray-800">
          <FaYoutube size={20} />
        </Link>
      </div>
      <div>
        <Link to={"/"}>
          <img src={logo} alt="secondary-logo" />
        </Link>
      </div>
      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-gray-600">Hi, {user?.name}</span>
            <Link to={"/create-post"} className="border rounded-xs text-tertiary active:bg-gray-200 px-3 py-0.5">
              Create Post
            </Link>
            <Link to={user?.role === "admin" ? "/admin" : "/dashboard"} className="hover:opacity-80">
              <img
                src={user?.picture_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
              />
            </Link>
            <button onClick={logout} className="hover:text-secondary active:text-red-700" title="Logout">
              <FaSignOutAlt size={20} />
            </button>
          </div>
        ) : (
          <div className="space-x-2.5">
            <Link to="/signup" className="border active:bg-gray-200 px-2 py-0.5 rounded-xs">
              Sign Up
            </Link>
            <Link to="/signin" className="border active:bg-gray-200 px-2 py-0.5 rounded-xs">
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
