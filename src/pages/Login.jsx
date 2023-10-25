import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Login(props) {
  const URL = props.url;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    // Check if the 'username' or 'password' are not  empty
    if (!username || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(`${URL}/users/handel_login`, {
        username,
        password,
      });


      if (res.data.message) navigate("/admin");
      else setError(res.data.error);
    } catch (err) {
      toast.error(`Error fetching data: ${error}`);
    }
  }

  return (
    <div className="container">
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
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
                      <p className="h6 text-danger mb-4">{error}</p>
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
