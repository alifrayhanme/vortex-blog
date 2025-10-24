// external imports
import { createBrowserRouter } from "react-router";

// internal imports
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
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
      { path: "/health", element: <CategoryPage /> },
      { path: "/sports", element: <CategoryPage /> },
      { path: "/politics", element: <CategoryPage /> },
      { path: "/business", element: <CategoryPage /> },
      { path: "/arts", element: <CategoryPage /> },
      { path: "/science", element: <CategoryPage /> },
      { path: "/world", element: <CategoryPage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/user", element: <User /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
