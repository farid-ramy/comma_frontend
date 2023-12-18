import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUrl } from "../context/UrlProvider";
import axios from "axios";
import { ShowWarningAlert } from "../utilities/toastify";
import pp from "../img/undraw_profile.svg";

export default function Navbar(props) {
  const { loggedInUser } = useAuth();
  const { url } = useUrl();
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    axios(`${url}/branches`)
      .then((res) => setBranches(res.data))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [props.reRenderNavbar, url]);
}