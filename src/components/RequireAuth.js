import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const RequireAuth = () => {
  const { loggedInUser } = useAuth();
  const location = useLocation();

  console.log(location.pathname.split("/")[1]);
  console.log(loggedInUser);

  return loggedInUser.role === location.pathname.split("/")[1] ? (
    <Outlet />
  ) : (
    <Navigate to="/404" state={{ from: location }} replace />
  );
};

export default RequireAuth;
