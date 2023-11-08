import React, { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../../App";
import axios from "axios";
import { ShowWarningAlert } from "../../utilities/toastify";

export default function Dashboard(props) {
  const URL = props.url;
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios(`${URL}/users/get_users`)
      .then((res) => setUsers(res.data))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <span className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </span>
      </div>
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total clients
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {users.length - 1}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fa-solid fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Earnings (Monthly)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $215,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
