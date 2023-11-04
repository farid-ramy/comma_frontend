import React, { useContext } from "react";
import pp from "../../img/undraw_profile.svg";
import { Link, Outlet } from "react-router-dom";
import { LoggedInUserContext } from "../../App";

export default function EmployeeNavbar(props) {
  const URL = props.url;
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  return (
    <>
      <div id="wrapper">
        <ul
          className="navbar-nav bg-gradient-warning sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <div className="sidebar-brand d-flex align-items-center justify-content-center">
            Comma
          </div>

          <hr className="sidebar-divider" />

          <li className="nav-item">
            <Link className="nav-link" to="/employee/checkedIn">
              <i className="fa-solid fa-check"></i>
              <span>Checked in</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee/users">
              <i className="fa-solid fa-users"></i>
              <span>Users</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee/branch">
              <i className="fa-solid fa-building"></i>
              <span>Branch</span>
            </Link>
          </li>
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      {loggedInUser.first_name} {loggedInUser.last_name}
                    </span>
                    <img className="img-profile rounded-circle" src={pp} />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      Settings
                    </a>
                    <Link className="dropdown-item" to="/">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>

            <div className="container-fluid">
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
    </>
  );
}
