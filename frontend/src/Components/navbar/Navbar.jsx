import React from "react";
import SmallNav from "./SmallNav";
import { Outlet } from "react-router";

const Navbar = () => {
  return (
    <>
      <SmallNav />
      <Outlet />
    </>
  );
};

export default Navbar;
