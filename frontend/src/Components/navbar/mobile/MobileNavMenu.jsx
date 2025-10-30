import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useAuth } from "../../../hooks/useAuth";

const MobileNavMenu = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const isMenuOpen = useSelector((state) => state.navmenu.isMenuOpen);

  const menuItems = [
    { id: "health", name: "Health", path: "/health" },
    { id: "sports", name: "Sports", path: "/sports" },
    { id: "politics", name: "Politics", path: "/politics" },
    { id: "business", name: "Business", path: "/business" },
    { id: "arts", name: "Arts", path: "/arts" },
    { id: "science", name: "Science", path: "/science" },
    { id: "world", name: "World", path: "/world" },
    { id: "about", name: "About", path: "/about" },
    { id: "contact", name: "Contact", path: "/contact" },
  ];

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {isMenuOpen && (
        <ul className="px-5 py-2.5 space-y-2 text-gray-600">
          {menuItems.map((item) => (
            <li key={item.id} id={item.id}>
              <Link
                onClick={() => isMenuOpen(false)}
                to={item.path}
                className="py-1 block active:bg-gray-200"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {isAuthenticated ? (
            <div className="border-t py-2.5 space-y-2.5">
              <li className="text-sm text-gray-500 py-1">Hi, {user?.name}</li>
              <li>
                <Link
                  onClick={() => isMenuOpen(false)}
                  to={"/create-post"}
                  className="hover:text-secondary active:text-red-700"
                >
                  Create Post
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => isMenuOpen(false)}
                  to={user?.role === "admin" ? "/admin" : "/dashboard"}
                  className="hover:text-secondary active:text-red-700 flex justify-start items-center gap-2.5"
                >
                  <img
                    src={user?.picture_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="hover:text-secondary active:text-red-700 flex justify-start items-center gap-2.5 w-full text-left"
                >
                  <FaSignOutAlt size={20} /> <span>Logout</span>
                </button>
              </li>
            </div>
          ) : (
            <div className="border-t space-y-2 py-2.5 ">
              <li>
                <Link className="py-1 block active:bg-gray-200" to={"/signup"}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="py-1 block active:bg-gray-200" to={"/signin"}>
                  Log In
                </Link>
              </li>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default MobileNavMenu;
