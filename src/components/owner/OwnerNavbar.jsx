import React, { useEffect, useState } from "react";
import pp from "../../img/undraw_profile.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShowWarningAlert } from "../../utilities/toastify";
import useAuth from "../../hooks/useAuth";

export default function OwnerNavbar(props) {
  const URL = props.url;
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    axios(`${URL}/branches`)
      .then((res) => {
        setBranches(res.data);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [props.reload]);

  return (
    <div id="wrapper">
      <ul
        className="navbar-nav bg-gradient-warning sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <div className="sidebar-brand d-flex align-items-center justify-content-center">
          Comma
        </div>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link className="nav-link" to="./dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className="nav-item">
          <Link className="nav-link" to="./users">
            <i className="fa-solid fa-users"></i>
            <span>Users</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="./packages">
            <i className="fa-solid fa-cube"></i>
            <span>Packages</span>
          </Link>
        </li>
        <li className="nav-item">
          <span
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fa-solid fa-building"></i>
            <span> Branches</span>
          </span>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="./add_branch">
                + Add
              </Link>

              {branches.length > 0 ? (
                <div>
                  <h6 className="collapse-header">current branches:</h6>
                  {branches.map((branch) => (
                    <Link
                      className="collapse-item"
                      to={`./branch/${branch.id}`}
                      key={branch.id}
                    >
                      {branch.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </li>
      </ul>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow">
                <span
                  className="nav-link dropdown-toggle"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {loggedInUser.first_name} {loggedInUser.last_name}
                  </span>
                  <img
                    className="img-profile rounded-circle"
                    src={pp}
                    alt="profile pic"
                  />
                </span>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <Link className="dropdown-item" to="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </Link>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.removeItem("loggedInUser");
                      navigate("/");
                    }}
                  >
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </nav>
          <div className="container-fluid mb-5">
            <Outlet />
          </div>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>
                Copyright &copy; Comma Co-Working Space{" "}
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
