import React, { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../../App";
import axios from "axios";
import { ShowWarningAlert } from "../../utilities/toastify";

export default function Dashboard(props) {
  const URL = props.url;
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/users/get_users`);
        setUsers(res.data);
        const res2 = await axios.get(`${URL}/packages`);
        setPackages(res2.data);
      } catch (error) {
        ShowWarningAlert("Please check your connection or try again later");
      }
    };

    fetchData();
  }, []);

  return (
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i class="fas fa-download fa-sm text-white-50"></i> Generate Report
        </a>
      </div>
      <div class="row">
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total clients
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {users.length - 1}
                  </div>
                </div>
                <div class="col-auto">
                  <i className="fa-solid fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Earnings (Monthly)
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    $215,000
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
