import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../features/auth/authSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data exists in localStorage on app initialization
    const userData = localStorage.getItem("user");
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        dispatch(setUser(user));
      } catch (error) {
        console.error("Error parsing user data:", error);
        dispatch(clearUser());
      }
    }
  }, [dispatch]);

  return children;
};

export default AuthProvider;