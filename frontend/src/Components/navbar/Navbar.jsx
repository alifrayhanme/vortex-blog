import React, { useEffect, useState } from "react";
import MobileNav from "./mobile/MobileNav";
import MobileNavMenu from "./mobile/MobileNavMenu";
import DesktopNav from "./desktop/DesktopNav";
import DesktopNavMenu from "./desktop/DesktopNavMenu";

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 920);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isDesktop ? (
        // Desktop Version
        <>
          <DesktopNav />
          <hr />
          <DesktopNavMenu />
          <hr />
        </>
      ) : (
        // Mobile Version
        <>
          <MobileNav />
          <hr />
          <MobileNavMenu />
        </>
      )}
    </>
  );
};

export default Navbar;
