// external import
import React from "react";
import { Link } from "react-router";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaUserCircle,
} from "react-icons/fa";

// internal import
import logo from "../../../assets/logo.svg";

const DesktopNav = () => {
  const isSign = true;

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
        {isSign ? (
          <div className="flex items-center gap-2.5">
            <Link  to={"/create-post"}  className="bg-tertiary rounded-md hover:bg-secondary active:bg-red-700 text-primary px-3 py-0.5">
              Create Post
            </Link>
            <Link to={"/user"} className="hover:text-secondary active:text-red-700">
              <FaUserCircle size={26} />
            </Link>
          </div>
        ) : (
          <div className="space-x-2.5">
            <button className="border active:bg-gray-200 px-2 py-0.5 rounded-xs">
              Sign Up
            </button>
            <button className="border active:bg-gray-200 px-2 py-0.5 rounded-xs">
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
