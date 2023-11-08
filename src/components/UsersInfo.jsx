import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShowSuccessAlert, ShowWarningAlert } from "../utilities/toastify";

export default function UsersInfo(props) {
  const URL = props.url;
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [reset, setReset] = useState(false);
  const [reload, setReload] = useState(false);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [national_id, setNationalId] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios(`${URL}/users/get_users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [reload]);

  useEffect(() => {
    setFirstName(user.first_name || "");
    setLastName(user.last_name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setJob(user.job || "");
    setNationalId(user.national_id || "");
    setAddress(user.address || "");
  }, [user, reset]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${URL}/users/update/${user.id}`, {
        first_name,
        last_name,
        role: user.role,
        email: email || null,
        phone: phone || null,
        job: job || null,
        national_id: national_id || null,
        address: address || null,
      })
      .then((res) => {
        if (!res.data.id)
          return ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);
        ShowSuccessAlert("User updated successfully");
        setReload(!reload);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  return (
    <div className="container">
      <div className="row gutters">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="row">
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                    <div className="form-group">
                      <label htmlFor="id">ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id="id"
                        value={user.id || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        id="role"
                        value={user.role || ""}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value.trim())}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={last_name}
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
                      value={email}
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
                      value={job}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button
                        type="submit"
                        id="submit"
                        className="btn btn-success mx-2"
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          setReset(!reset);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <hr className="border-5" />
              <div className="mb-3">
                <p className="h2">Subscribed Package :</p>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
              </div>
              <div className="mb-3">
                <p className="h2">History :</p>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-9"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-11"></span>
                  <span className="placeholder col-4"></span>
                  <br />
                  <span className="placeholder col-5"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
