// external import
import { useSelector } from "react-redux";
import { Link } from "react-router";

// imternal import
import logo from "../../assets/footer-logo.svg";

const Footer = () => {
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
    <div className="flex flex-col border-t-4 border-brand mt-10">
      <div className="bg-text">
        <div className="max-w-7xl mx-auto text-background p-5 flex flex-wrap justify-between gap-10">
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
      </div>

      <div className="border-y border-background bg-text">
        <div className="max-w-7xl mx-auto flex justify-between sm:justify-start sm:gap-32 p-5">
          <div className="space-y-5">
            <p className="text-background font-semibold text-lg">COMPANY</p>
            <ul className="list-none text-background">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"about"}>About</Link>
              </li>
              <li>
                <Link to={"contact"}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-5">
            <p className="text-background font-semibold text-lg">
              SOCIAL MEDIA
            </p>
            <ul className="list-none text-background">
              <li>
                <Link to={"#"}>Instagram</Link>
              </li>
              <li>
                <Link to={"#"}>Linkedin</Link>
              </li>
              <li>
                <Link to={"#"}>YouTube</Link>
              </li>
              <li>
                <Link to={"#"}>Facebook</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-text">
        <div className="max-w-7xl mx-auto text-center p-5 text-background">
          Copyright © {new Date().getFullYear()} Nexus News
        </div>
      </div>
    </div>
  );
};

export default Footer;
