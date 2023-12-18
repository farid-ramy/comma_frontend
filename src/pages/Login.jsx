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

  // JSX for the login component
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <br />
                      <h1 className="h3 text-gray-900 mb-4">Welcome Back!</h1>
                      <br />
                      <br />
                      <br />
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputUsername"
                          placeholder="Enter your Username..."
                          onChange={(e) => handleInputChange(e, setUsername)}
                        />
                      </div>
                      <div className="form-group position-relative">
                        <input
                          type={eye ? "password" : "text"}
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          onChange={(e) => handleInputChange(e, setPassword)}
                        />
                        <i
                          className={`fa-solid position-absolute ${
                            eye ? "fa-eye" : "fa-eye-slash"
                          }`}
                          style={{
                            right: "20px",
                            top: "40%",
                            cursor: "pointer",
                          }}
                          onClick={togglePasswordVisibility}
                        ></i>
                      </div>
                      <br />
                      <br />
                      <br />
                      <button className="btn btn-warning btn-user btn-block">
                        Login
                      </button>
                      <br />
                      <br />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
