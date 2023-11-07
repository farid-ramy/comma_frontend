import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";
import {
  ShowSuccessAlert,
  ShowFailedAlert,
  ShowWarningAlert,
} from "../utilities/toastify";

export default function Users(props) {
  const URL = props.url;
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/users/get_users`);
        setData(res.data);
        $(document).ready(function () {
          $("#dataTable").DataTable();
        });
      } catch (error) {
        ShowWarningAlert("Please check your connection or try again later");
      }
    };

    fetchData();
  }, [reload]);

  async function handleDeleteBtn(user) {
    if (
      window.confirm(
        `Are you should you want to delete ${user.first_name} ${user.last_name} ?`
      )
    )
      axios
        .delete(`${URL}/users/delete/${user.id}`)
        .then(() => {
          setReload(!reload);
          ShowSuccessAlert(
            `${user.first_name} ${user.last_name} was deleted successfully`
          );
        })
        .catch((error) => ShowFailedAlert(error));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName) {
      ShowWarningAlert("Fill all the important fields");
      return;
    }
    try {
      const res = await axios.post(`${URL}/users/add`, {
        first_name: firstName,
        last_name: lastName,
        role,
        email: email ? email : null,
        phone: phone ? phone : null,
      });
      if (!res.data.id) ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);
      else {
        ShowSuccessAlert("User added successfully");
        setReload(!reload);
        $("#exampleModal").modal("hide");
        $("#myForm")[0].reset();
      }
    } catch (error) {
      ShowFailedAlert(error);
    }
  }
  
  return (
    <div className="container-fluid">
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
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Job</th>
                  <th>Address</th>
                  <th>National id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.slice(1).map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <Link
                        className="text-dark"
                        to={`/admin/user_info/${user.id}`}
                      >
                        {user.first_name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="text-dark"
                        to={`/admin/user_info/${user.id}`}
                      >
                        {user.last_name}
                      </Link>
                    </td>
                    <td>{user.email ? "***" : "-"}</td>
                    <td>{user.phone ? "***" : "-"}</td>
                    <td>{user.role}</td>
                    <td>{user.job ? user.job.slice(0, 5) + "..." : "-"}</td>
                    <td>
                      {user.address ? user.address.slice(0, 5) + ".." : "-"}
                    </td>
                    <td>{user.national_id ? "***" : "-"}</td>
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
                <div className="form-row">
                  <div className="form-group col-3">
                    <label htmlFor="id">
                      Role
                      <span className="text-danger"> * </span>
                    </label>
                    <br />
                    <select
                      id="role"
                      value={role}
                      className="form-select "
                      onChange={(e) => setRole(e.target.value.trim())}
                    >
                      <option value="client">Client</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName">
                      First Name
                      <span className="text-danger"> * </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First name"
                      onChange={(e) => setFirstName(e.target.value.trim())}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastName">
                      Last Name
                      <span className="text-danger"> * </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last name"
                      onChange={(e) => setLastName(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="Email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value.trim())}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      className="form-control"
                      id="phone"
                      placeholder="phone"
                      value={phone}
                      onChange={(e) => {
                        if (/^\d*$/.test(e.target.value.trim())) {
                          setPhone(e.target.value.trim());
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button type="reset" className="btn btn-secondary">
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