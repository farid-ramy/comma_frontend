import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { LoggedInUserContext } from "../App";

const PrivateRoutes = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const [auth, setAuth] = useState(true);
  const location = useLocation();

  const currentURL = location.pathname.split("/")[1];

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      setLoggedInUser(loggedInUser);
      if (
        loggedInUser &&
        loggedInUser.role &&
        loggedInUser.role === currentURL
      ) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } else {
      setAuth(false);
    }
  }, []);

  return auth ? <Outlet /> : <Navigate to="/404" />;
};

export default PrivateRoutes;
