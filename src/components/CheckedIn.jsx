import React, { useEffect, useState, useContext } from "react";
import { LoggedInUserContext } from "../App";

import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";
import {
  ShowSuccessAlert,
  ShowFailedAlert,
  ShowWarningAlert,
} from "../utilities/toastify";

export default function CheckedIn(props) {
  const URL = props.url;
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const [usersData, setUsersData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios(`${URL}/users/get_users`)
      .then((res) => setUsersData(res.data))
      .then(() => {
        $(document).ready(function () {
          $("#dataTable").DataTable();
        });
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [reload]);

  return (
    <div>
      <div className="input-group col-4 mb-5 container">
        <input
          type="text"
          placeholder=" Search.. "
          className="form-control"
          style={{ borderRadius: "5px 0 0 5px" }}
        />
        <button type="button" className="btn btn-success">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Job</th>
                  <th>Address</th>
                  <th>National id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usersData
                  .filter((user) => {
                    if (
                      user.role !== "owner" &&
                      loggedInUser.role !== user.role &&
                      (loggedInUser.role !== "admin" || user.role === "client")
                    )
                      return user;
                  })
                  .map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <Link
                          className="text-dark"
                          to={`../user_info/${user.id}`}
                        >
                          {user.first_name} {user.last_name}
                        </Link>
                      </td>
                      <td>
                        {user.phone ? "***" : "-"}
                        <span className="d-none">{user.phone}</span>
                      </td>
                      <td>
                        {user.email ? "***" : "-"}
                        <span className="d-none">{user.email}</span>
                      </td>
                      <td>{user.role}</td>
                      <td>
                        {user.job ? user.job.slice(0, 5) + "..." : "-"}
                        <span className="d-none">{user.job}</span>
                      </td>
                      <td>
                        {user.address ? user.address.slice(0) + ".." : "-"}
                        <span className="d-none">{user.address}</span>
                      </td>
                      <td>
                        {user.national_id ? "***" : "-"}
                        <span className="d-none">{user.national_id}</span>
                      </td>
                      <td>
                        <button
                          className="text-danger border-0 bg-color bg-transparent"
                          // onClick={() => handleDeleteBtn(user)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
