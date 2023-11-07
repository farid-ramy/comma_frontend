import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShowFailedAlert } from "../utilities/toastify";

export default function UsersInfo(props) {
  const URL = props.url;
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newJob, setNewJob] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newNationalId, setNewNationalId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/users/get_users/${userId}`);
        setUser(res.data);
      } catch (error) {
        ShowFailedAlert(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setNewFirstName(user.first_name);
    setNewLastName(user.last_name);
    setNewEmail(user.email);
    setNewPhone(user.phone);
    setNewJob(user.job);
    setNewAge(user.age);
    setNewAddress(user.address);
    setNewNationalId(user.national_id);
  }, [user]);

  async function handleUpdate(e) {
    e.preventDefault();
  }

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
                        value={user.id ?? ""}
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
                        value={user.role ?? ""}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter First Name"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value.trim())}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter Last Name"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value.trim())}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value.trim())}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Phone"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value.trim())}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value.trim())}
                  />
                </div>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button
                        type="submit"
                        id="submit"
                        name="submit"
                        className="btn btn-success mx-2"
                      >
                        Update
                      </button>
                      <button
                        type="reset"
                        id="submit"
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
