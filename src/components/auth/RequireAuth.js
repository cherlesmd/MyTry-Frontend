import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../auth/AuthPovider";
import { useContext } from "react";

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
