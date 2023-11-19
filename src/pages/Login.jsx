import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUrl } from "../context/UrlProvider";
import axios from "axios";
import { ShowFailedAlert, ShowWarningAlert } from "../utilities/toastify";

export default function Login() {
  const { setLoggedInUser } = useAuth();
  const { url } = useUrl();
  const navigate = useNavigate();

  const [eye, setEye] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password)
      return ShowWarningAlert("Please fill all the fields");

    axios
      .post(`${url}/users/login`, {
        username,
        password,
      })
      .then((res) => {
        if (res.data.error) return ShowFailedAlert(res.data.error);
        else {
          setLoggedInUser(res.data);
          localStorage.setItem("loggedInUser", JSON.stringify(res.data));
          navigate(`/${res.data.role}`);
        }
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <br />
                  <br />
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h3 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <br />
                    <br />
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputUsername"
                          placeholder="Enter your Username..."
                          onChange={(e) => setUsername(e.target.value.trim())}
                        />
                      </div>
                      <div className="form-group position-relative">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value.trim())}
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
                          onClick={() => {
                            setEye(!eye);
                            const passwordInput = document.getElementById(
                              "exampleInputPassword"
                            );
                            if (passwordInput.type === "password")
                              passwordInput.type = "text";
                            else passwordInput.type = "password";
                          }}
                        ></i>
                      </div>
                      <br />
                      <br />
                      <br />
                      <button className="btn btn-warning btn-user btn-block">
                        Login
                      </button>
                    </form>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
