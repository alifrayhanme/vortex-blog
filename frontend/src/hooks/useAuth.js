import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { selectCurrentUser, selectIsAuthenticated, clearUser } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/api/apiSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [logoutMutation] = useLogoutMutation();
  
  // Check if token exists and user is authenticated
  const token = localStorage.getItem('accessToken');
  const isReallyAuthenticated = isAuthenticated && token && user;

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(clearUser());
      navigate("/signin");
    }
  };

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return {
    user,
    isAuthenticated: isReallyAuthenticated,
    isAdmin,
    isUser,
    logout,
  };
};