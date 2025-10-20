// external imports
import { createBrowserRouter } from "react-router";

// internal imports
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Health from "../pages/Health";
import Sports from "../pages/Sports";
import Politics from "../pages/Politics";
import Business from "../pages/Business";
import Arts from "../pages/Arts";
import Science from "../pages/Science";
import World from "../pages/World";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Error from "../pages/Error";
import NotFound from "../pages/NotFound";
import CreatePost from "../pages/CreatePost";
import User from "../pages/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/health", element: <Health /> },
      { path: "/sports", element: <Sports /> },
      { path: "/politics", element: <Politics /> },
      { path: "/business", element: <Business /> },
      { path: "/arts", element: <Arts /> },
      { path: "/science", element: <Science /> },
      { path: "/world", element: <World /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/user", element: <User /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
