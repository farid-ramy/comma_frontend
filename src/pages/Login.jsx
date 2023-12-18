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

}