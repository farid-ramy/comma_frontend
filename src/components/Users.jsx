import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";

export default function Users(props) {
  const URL = props.url;
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/userss`);
        setData(res.data);
        $(document).ready(function () {
          $("#dataTable").DataTable();
        });
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, []);

  async function handleDeleteBtn(user) {
    if (
      window.confirm(
        `Are you should you want to delete ${user.first_name} ${user.last_name} ?`
      )
    )
      axios
        .delete(`${URL}/users/delete/${user.id}`)
        .then(() => window.location.reload())
        .catch((error) => toast.error(`Error deleting user: ${error}`));
  }

  const handlePhoneChange = (e) => {
    if (/^\d*$/.test(e.target.value.trim())) {
      setPhone(e.target.value.trim());
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName) {
      setError("Fill all the important fields");
      return;
    } else setError("");
    try {
      const res = await axios.post(`${URL}/users/add`, {
        first_name: firstName,
        last_name: lastName,
        role,
        email: email ? email : null,
        phone: phone ? phone : null,
      });
      if (!res.data.id) setError(res.data[Object.keys(res.data)[0]][0]);
      else window.location.reload();
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return (
    <div className="container-fluid">
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />

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
                  <th>Age</th>
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
                    <td>{user.age ?? "-"}</td>
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
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <p className="h6 text-danger mb-4 text-center">{error}</p>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="id">
                      Role
                      <span className="text-danger"> * </span>
                    </label>
                    <br />
                    <select
                      id="role"
                      className="form-select"
                      aria-label="Default select example"
                      value={role}
                      onChange={(e) => setRole(e.target.value.trim())}
                    >
                      <option defaultValuevalue="client">Client</option>
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
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary"
                  data-dismiss="modal"
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
