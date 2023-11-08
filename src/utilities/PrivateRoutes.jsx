import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../App";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const [auth, setAuth] = useState(true);
  const location = useLocation();

  const currentURL = location.pathname.split("/")[1];

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const loggedInUser = await JSON.parse(storedUser);
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
        navigate("/");
      }
    };

    fetchLoggedInUser();
  }, []);

  return auth ? <Outlet /> : <Navigate to="/404" />;
};

export default PrivateRoutes;
