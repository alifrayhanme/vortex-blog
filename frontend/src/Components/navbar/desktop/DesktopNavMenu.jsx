import React from "react";
import { Link } from "react-router";

const DesktopNavMenu = () => {
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
    <div className="max-w-7xl mx-auto  flex flex-wrap justify-center items-center gap-6 px-5 py-5">
      {menuItems.map((item) => (
        <ul key={item.id} id={item.id}>
          <Link
            to={item.path}
            className="p-1 block font-semibold text-lg hover:text-secondary focus:text-secondary active:bg-gray-200"
          >
            {item.name}
          </Link>
        </ul>
      ))}
    </div>
  );
};

export default DesktopNavMenu;
