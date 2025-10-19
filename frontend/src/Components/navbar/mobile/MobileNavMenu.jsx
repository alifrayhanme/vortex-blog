import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const MobileNavMenu = () => {
  const isSign = false;

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
        isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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

          {isSign ? (
            <div className="border-t py-2.5">
              <Link
                to={"#"}
                className="hover:text-brand active:text-red-700 flex justify-start items-center gap-2.5"
              >
                <FaUserCircle size={24} /> <span>Profile</span>
              </Link>
            </div>
          ) : (
            <div className="border-t space-y-2 py-2.5 ">
              <li>
                <Link className="py-1 block active:bg-gray-200" to={"#"}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="py-1 block active:bg-gray-200" to={"#"}>
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
