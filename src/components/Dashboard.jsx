import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useUrl } from "../context/UrlProvider";
import { ShowWarningAlert } from "../utilities/toastify";
import {
  ScatterChartExample,
  LineChartExample,
  BarChartExample,
  PieChartExample,
  AreaChartExample,
} from "./charts";

export default function Dashboard() {
  const { setLoggedInUser } = useAuth();
  const { url } = useUrl();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios(`${url}/users/get`)
      .then((res) => setUsers(res.data))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex justify-content-end mb-4">
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
      <ScatterChartExample />
      <LineChartExample />
      <BarChartExample />
      <PieChartExample />
      <AreaChartExample />
    </div>
  );
}
