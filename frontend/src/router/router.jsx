// external imports
import { createBrowserRouter } from "react-router";

// internal improts
import Navbar from "../Components/navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
  },
]);

export default router;
