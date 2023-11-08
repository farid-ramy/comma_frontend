import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { ShowFailedAlert, ShowWarningAlert } from "../utilities/toastify";

export default function Login(props) {
  const URL = props.url;
  const { setLoggedInUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!username || !password) {
      ShowWarningAlert("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(`${URL}/users/handel_login`, {
        username,
        password,
      });

      if (res.data.error) {
        ShowFailedAlert(res.data.error);
        return;
      } else {
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
        navigate(`/${res.data.role}`);
      }
    } catch (err) {
      ShowWarningAlert("Please check your connection or try again later");
    }
  }

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
                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputUsername"
                          placeholder="Enter your Username..."
                          onChange={(e) => setUsername(e.target.value.trim())}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value.trim())}
                        />
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
