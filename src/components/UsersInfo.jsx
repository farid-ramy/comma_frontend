import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const UsersInfo = (props) => {
  const URL = props.url;
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const [newFirstName, setNewFirstName] = useState(user.first_name);
  const [newLastName, setNewLastName] = useState(user.last_name);
  const [newEmail, setNewEmail] = useState(user.email || "");
  const [newPhone, setNewPhone] = useState(user.phone || "");
  const [newJob, setNewJob] = useState(user.job || "");
  const [newAge, setNewAge] = useState(user.age || "");
  const [newAddress, setNewAddress] = useState(user.address || "");
  const [newNationalId, setNewNationalId] = useState(user.national_id || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
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
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handel submit");
  }

  return (
    <div className="container">
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
      <div className="row gutters">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                    <div className="form-group">
                      <label htmlFor="id">ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id="id"
                        value={user.id}
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
                        value={user.role}
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
};

export default UsersInfo;
