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
import EditPost from "../pages/EditPost";
import User from "../pages/User";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import { SearchResult } from "../pages/SearchResult";
import PostDetails from "../pages/PostDetails";
import ProtectedRoute from "../Components/ProtectedRoute";

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
      { path: "/search", element: <SearchResult /> },
      { path: "/post/:id", element: <PostDetails /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { 
        path: "/create-post", 
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/edit-post/:id", 
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/dashboard", 
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/admin", 
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        ) 
      },
      { path: "/user", element: <User /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
