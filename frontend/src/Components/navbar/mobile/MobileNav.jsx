// external import
import { HiBars3, HiXMark } from "react-icons/hi2";
import { toggleMenu } from "../../../features/navmenu/navMenuSlice";
import { useDispatch, useSelector } from "react-redux";

// internal import
import logo from "../../../assets/logo.svg";
import { Link } from "react-router";

const MobileNav = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.navmenu.isMenuOpen);
  const handleToggleMenu = () => dispatch(toggleMenu());

  return (
    <div className="flex justify-between items-center gap-10 p-5">
      <div>
        <Link to={"/"} onClick={() => isMenuOpen(false)}>
          <img src={logo} alt="secondary-logo" />
        </Link>
      </div>

      <div className="border border-secondary text-secondary active:bg-gray-200 h-9 w-9 rounded-xs flex justify-center items-center">
        {isMenuOpen ? (
          // Menu Open → show X (close)
          <div>
            <HiXMark
              size={24}
              onClick={handleToggleMenu}
              className="cursor-pointer"
            />
          </div>
        ) : (
          // Menu Closed → show Bars (menu)
          <div>
            <HiBars3
              size={24}
              onClick={handleToggleMenu}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
