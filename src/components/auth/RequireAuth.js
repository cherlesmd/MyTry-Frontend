import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../auth/AuthPovider";
import { useContext, useEffect } from "react";

const RequireAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("persist");
    if (loggedInUser) {
      setAuth(true);
    }
  }, []);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
