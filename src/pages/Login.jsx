import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUrl } from "../context/UrlProvider";
import axios from "axios";
import { ShowFailedAlert, ShowWarningAlert } from "../utilities/toastify";

const Login = () => {

  // Hooks and context
  const { setLoggedInUser } = useAuth();
  const { url } = useUrl();
  const navigate = useNavigate();

  // State variables
  const [eye, setEye] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleInputChange = (e, setValue) => setValue(e.target.value.trim());

  const togglePasswordVisibility = () => {
    setEye(!eye);
    const passwordInput = document.getElementById("exampleInputPassword");
    passwordInput.type = eye ? "text" : "password";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      return ShowWarningAlert("Please fill in all the fields");
    }

    try {
      const res = await axios.post(`${url}/users/login`, {
        username,
        password,
      });

      if (res.data.error) {
        ShowFailedAlert(res.data.error);
      } else {
        setLoggedInUser(res.data);
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));

        // Navigate to the appropriate role-based page
        navigate(`/${res.data.role}`);
      }
    } catch (error) {
      ShowWarningAlert("Please check your connection or try again later");
    }
  };
}