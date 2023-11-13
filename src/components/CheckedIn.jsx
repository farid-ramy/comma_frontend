import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";
import { ShowWarningAlert } from "../utilities/toastify";
import useAuth from "../hooks/useAuth";

export default function CheckedIn(props) {
  const URL = props.url;
  const { loggedInUser } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [checkedInUsers, setcheckedInUsers] = useState([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [reload, setReload] = useState(false);
  const [payment, setpayment] = useState(0);

  useEffect(() => {
    axios(`${URL}/users/get?role=client`)
      .then((res) => setUsersData(res.data))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, []);

  useEffect(() => {
    if (loggedInUser.branch)
      axios(`${URL}/history?branch_id=${loggedInUser.branch.id} `)
        .then((res) => {
          if ($.fn.dataTable.isDataTable("#dataTable"))
            $("#dataTable").DataTable().destroy();
          setcheckedInUsers(res.data);
        })
        .then(() => setTimeout(() => $("#dataTable").DataTable(), 10))
        .catch(() =>
          ShowWarningAlert("Please check your connection or try again later")
        );
  }, [reload]);

  const fetchData = async (value) => {
    const results = usersData.filter((user) => {
      return (
        user.id.toString()?.toLowerCase()?.includes(value) ||
        false ||
        user.first_name?.toLowerCase()?.includes(value) ||
        false ||
        user.last_name?.toLowerCase()?.includes(value) ||
        false ||
        user.phone?.toLowerCase()?.includes(value) ||
        false ||
        user.national_id?.toLowerCase()?.includes(value) ||
        false
      );
    });
    if (results) setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    if (value) fetchData(value);
    else setResults([]);
  };

  const handleStart = (user) => {
    axios
      .post(`${URL}/history/create`, {
        client: user.id,
        employee: loggedInUser.id,
        branch: loggedInUser.branch.id,
      })
      .then((res) => {
        if (res.data.error) {
          return ShowWarningAlert(res.data.error);
        }
        handleChange("");
        setReload(!reload);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  const handleStopBtn = (checkedInRecord) => {
    axios
      .put(`${URL}/history/${checkedInRecord.id}/check_out`, {
        payment,
      })
      .then((res) => {
        if (res.error) ShowWarningAlert(res.error);
        setReload(!reload);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  const handleDeleteBtn = (checkedInRecord) => {
    if (
      window.confirm(
        `Are you should you want to delete ${checkedInRecord.client.first_name} ${checkedInRecord.client.last_name} ?`
      )
    ) {
      axios
        .delete(`${URL}/history/${checkedInRecord.id}/delete`)
        .then((res) => {
          if (res.error) ShowWarningAlert(res.error);
          setReload(!reload);
        })
        .catch(() =>
          ShowWarningAlert("Please check your connection or try again later")
        );
    }
  };

  return (
    <div>
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
                Check out
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
            <form id="myForm">
              <div className="modal-body">
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="payment">Payment</label>
                    <input
                      type="text"
                      className="form-control"
                      id="payment"
                      value={payment}
                      onChange={(e) =>
                        /^\d*$/.test(e.target.value.trim()) &&
                        setpayment(e.target.value.trim())
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  // onClick={() => handleStopBtn(checkedInRecord)}
                >
                  Check out
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

      <div
        className="position-relative mb-3"
        id="search"
        style={{ width: "50%", margin: " 0 auto" }}
      >
        <div className="input-group">
          <input
            type="text"
            placeholder=" Search.. "
            className="form-control rounded-0"
            value={input}
            onChange={(e) => handleChange(e.target.value.trim())}
          />
          <button type="button" className="btn btn-success rounded-0">
            <i className="fas fa-search"></i>
          </button>
        </div>
        {results.length > 0 && (
          <div
            className="position-absolute"
            style={{
              maxHeight: "300px",
              overflow: "scroll",
              zIndex: "2",
              top: "100%",
              left: "50%",
              width: "100%",
              transform: "translateX(-50%)",
              boxShadow: "0px 2px 2px rgba(0,0,0,0.45)",
            }}
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">National Id</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => {
                  return (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.first_name + " " + user.last_name}</td>
                      <td>
                        {user.phone ? "*****" + user.phone.slice(-4) : "-"}
                      </td>
                      <td>{user.national_id ?? "-"}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleStart(user)}
                        >
                          Start
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
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
                  <th>Check In</th>
                  <th>Check out</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {checkedInUsers.map((checkedInRecord) => (
                  <tr key={checkedInRecord.client.id}>
                    <td>{checkedInRecord.client.id}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link
                        className="text-dark"
                        to={`../user_info/${checkedInRecord.client.id}`}
                      >
                        {checkedInRecord.client.first_name}{" "}
                        {checkedInRecord.client.last_name}
                      </Link>
                    </td>
                    <td>
                      {checkedInRecord.client.phone
                        ? "*****" + checkedInRecord.client.phone.slice(-4)
                        : "-"}
                      <span className="d-none">
                        {checkedInRecord.client.phone}
                      </span>
                    </td>
                    <td>
                      {checkedInRecord.client.email ? "***" : "-"}
                      <span className="d-none">
                        {checkedInRecord.client.email}
                      </span>
                    </td>
                    <td>
                      {new Date(checkedInRecord.check_in_time).toLocaleString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Stop
                      </button>
                    </td>
                    <td>
                      <button
                        className="text-danger border-0 bg-color bg-transparent"
                        onClick={() => handleDeleteBtn(checkedInRecord)}
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
