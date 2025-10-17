import React from "react";
import logo from "../../assets/logo.svg";

const SmallNav = () => {
  return (
    <div className="flex justify-between items-center p-2.5">
      <img src={logo} alt="brand-logo" />
    </div>
  );
};

export default SmallNav;
