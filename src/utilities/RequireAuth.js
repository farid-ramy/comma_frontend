import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { loggedInUser } = useAuth();
  const location = useLocation();

  return loggedInUser.role === location.pathname.split("/")[1] ? (
    <Outlet />
  ) : (
    <Navigate to="/404" state={{ from: location }} replace />
  );
};

export default RequireAuth;
