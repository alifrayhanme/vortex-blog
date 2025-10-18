// external imports
import { createBrowserRouter } from "react-router";

// internal imports
import Layout from "../layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <div>Home Page</div> },
      { path: "/about", element: <div>About Page</div> },
      { path: "/health", element: <div>Health Page</div> },
      { path: "/sports", element: <div>Sports Page</div> },
      { path: "/politics", element: <div>Politics Page</div> },
      { path: "/business", element: <div>Business Page</div> },
      { path: "/arts", element: <div>Arts Page</div> },
      { path: "/science", element: <div>Science Page</div> },
      { path: "/world", element: <div>World Page</div> },
      { path: "/contact", element: <div>Contact Page</div> },
    ],
  },

]);

export default router;
