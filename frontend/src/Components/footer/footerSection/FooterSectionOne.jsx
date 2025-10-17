// external import
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

// imternal import
import logo from "../../../assets/footer-logo.svg";

const FooterSectionOne = () => {
  const menuItems = [
    { id: "health", name: "Health", path: "/health" },
    { id: "sports", name: "Sports", path: "/sports" },
    { id: "politics", name: "Politics", path: "/politics" },
    { id: "business", name: "Business", path: "/business" },
    { id: "arts", name: "Arts", path: "/arts" },
    { id: "science", name: "Science", path: "/science" },
    { id: "world", name: "World", path: "/world" },
  ];

  const isMenuOpen = useSelector((state) => state.navmenu.isMenuOpen);
  return (
    <div className="max-w-7xl mx-auto text-white p-5 flex flex-wrap justify-between gap-10">
      <div>
        <Link to={"/"} onClick={() => isMenuOpen(false)}>
          <img src={logo} alt="brand-logo" />
        </Link>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {menuItems?.map((item) => (
          <Link to={item.path} key={item.id}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterSectionOne;
