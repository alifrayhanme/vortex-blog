// external import
import React from "react";
import { Outlet } from "react-router";

// internal import
import Navbar from "../Components/navbar/Navbar";
import Footer from "../Components/footer/Footer";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
