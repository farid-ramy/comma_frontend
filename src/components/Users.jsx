import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import {
  ShowSuccessAlert,
  ShowFailedAlert,
  ShowWarningAlert,
} from "../utilities/toastify";
import $ from "jquery";
import "datatables.net";

export default function Users(props) {
  const URL = props.url;
  const { loggedInUser } = useAuth();

  const [usersData, setUsersData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [role, setRole] = useState("client");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [national_id, setNationalId] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios(`${URL}/users/get`)
      .then((res) => {
        if ($.fn.dataTable.isDataTable("#dataTable"))
          $("#dataTable").DataTable().destroy();
        setUsersData(res.data);
      })
      .then(() => {
        setTimeout(() => $("#dataTable").DataTable(), 10);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [refresh]);

  const handleDeleteBtn = (user) => {
    if (
      window.confirm(
        `Are you should you want to delete ${user.first_name} ${user.last_name} ?`
      )
    )
      axios
        .delete(`${URL}/users/${user.id}/delete`)
        .then(() => {
          setRefresh(!refresh);
          ShowSuccessAlert(
            `${user.first_name + " " + user.last_name} was deleted successfully`
          );
        })
        .catch((error) => ShowFailedAlert(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !last_name)
      return ShowWarningAlert("Fill all the important fields");
    if (role === "client") {
      setUserName("");
      setPassword("");
    }
    axios
      .post(`${URL}/users/create`, {
        role,
        first_name,
        last_name,
        username,
        password,
        phone: phone || null,
        email: email || null,
        national_id: national_id || null,
        job: job || null,
        address: address || null,
        branch: loggedInUser.role === "owner" ? null : loggedInUser.branch.id,
        created_by: loggedInUser.id,
      })
      .then((res) => {
        if (!res.data.id)
          return ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);
        ShowSuccessAlert("User added successfully");
        setRefresh(!refresh);
        $("#exampleModal").modal("hide");
        $("#myForm")[0].reset();
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  return (
    <div>
      {loggedInUser.branch || loggedInUser.role === "owner" ? (
        <div className="d-flex flex-row-reverse">
          <button
            type="button"
            className="btn btn-secondary mb-3"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            + Add User
          </button>
        </div>
      ) : null}
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
                        {user.phone ? "*****" + user.phone.slice(-4) : "-"}
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
                          onClick={() => handleDeleteBtn(user)}
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
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} id="myForm">
              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-4">
                    <label htmlFor="role">Role</label>
                    <select
                      id="role"
                      value={role}
                      className="form-select"
                      onChange={(e) => setRole(e.target.value.trim())}
                    >
                      {["client", "admin", "manager"]
                        .filter((role) => {
                          if (
                            role !== "owner" &&
                            loggedInUser.role !== role &&
                            (loggedInUser.role !== "admin" || role === "client")
                          )
                            return role;
                        })
                        .map((role) => (
                          <option value={role} key={role}>
                            {role}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {role !== "client" && (
                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="userName">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        onChange={(e) => setUserName(e.target.value.trim())}
                      />
                    </div>
                    <div className="form-group col-6">
                      <label htmlFor="password">Password</label>
                      <input
                        type="text"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPassword(e.target.value.trim())}
                      />
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="firstName">
                      First Name
                      <span className="text-danger"> * </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value.trim())}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="lastName">
                      Last Name
                      <span className="text-danger"> * </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      onChange={(e) => setLastName(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={(e) => setEmail(e.target.value.trim())}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) =>
                        /^\d*$/.test(e.target.value.trim()) &&
                        setPhone(e.target.value.trim())
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="job">Job</label>
                    <input
                      type="text"
                      className="form-control"
                      id="job"
                      onChange={(e) => setJob(e.target.value.trim())}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="nationalId">National id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nationalId"
                      value={national_id}
                      onChange={(e) =>
                        /^\d*$/.test(e.target.value.trim()) &&
                        setNationalId(e.target.value.trim())
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      onChange={(e) => setAddress(e.target.value.trim())}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    $("#exampleModal").modal("hide");
                    $("#myForm")[0].reset();
                  }}
                  className="btn btn-secondary"
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
