import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShowSuccessAlert, ShowWarningAlert } from "../utilities/toastify";
import { useUrl } from "../context/UrlProvider";

const UsersInfo = () => {
  const { url } = useUrl();
  const { userId } = useParams();
  const [reset, setReset] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({});
  const [branch, setBranch] = useState({});
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job: "",
    national_id: "",
    address: "",
  });


  useEffect(() => {
    axios(`${url}/users/get/${userId}`)
      .then((res) => {
        setUser(res.data);
        setBranch(res.data.branch);
        setHistory(res.data.history);
      })
      .catch((err) =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [refresh, url, userId]);


  useEffect(() => {
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone || "",
      job: user.job || "",
      national_id: user.national_id || "",
      address: user.address || "",
    });
  }, [user, reset]);


  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value.trim(),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/users/${user.id}/update`, {
        role: user.role,
        ...formData,
      });

      if (!res.data.id) {
        ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);
      } else {
        ShowSuccessAlert("User updated successfully");
        setRefresh(!refresh);
      }
    } catch (error) {
      ShowWarningAlert("Please check your connection or try again later");
    }
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
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                    <div className="form-group">
                      <label htmlFor="createAt">Create at</label>
                      <input
                        type="text"
                        className="form-control"
                        id="createAt"
                        value={new Date(user.created_at).toLocaleString() || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                    <div className="form-group">
                      <label htmlFor="createInBranch">Create in branch</label>
                      <input
                        type="text"
                        className="form-control"
                        id="createInBranch"
                        value={branch.name || ""}
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
                      value={formData.first_name}
                      onChange={(e) =>
                        handleInputChange("first_name", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={formData.last_name}
                      onChange={(e) =>
                        handleInputChange("last_name", e.target.value)
                      }
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
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        /^\d*$/.test(trimmedValue) &&
                          handleInputChange("phone", trimmedValue);
                      }}
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
                      value={formData.job}
                      onChange={(e) => handleInputChange("job", e.target.value)}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="nationalId">National id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nationalId"
                      value={formData.national_id}
                      onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        /^\d*$/.test(trimmedValue) &&
                          handleInputChange("national_id", trimmedValue);
                      }}
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
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button type="submit" className="btn btn-success mx-2">
                        Update
                      </button>
                      <button
                        type="reset"
                        className="btn btn-secondary"
                        onClick={() => setReset(!reset)}
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
                {history.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Check in</th>
                        <th scope="col">Check out</th>
                        <th scope="col">time</th>
                        <th scope="col">payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((h, index) => {
                        const checkInTime = new Date(h.check_in_time);
                        const checkOutTime = new Date(
                          h.check_out_time ?? h.check_in_time
                        );

                        const timeDifference = new Date(
                          checkOutTime - checkInTime
                        );

                        const hours = timeDifference.getUTCHours();
                        const minutes = timeDifference.getUTCMinutes();
                        const seconds = timeDifference.getUTCSeconds();

                        const formattedTimeDifference = `${hours
                          .toString()
                          .padStart(2, "0")}:${minutes
                            .toString()
                            .padStart(2, "0")}:${seconds
                              .toString()
                              .padStart(2, "0")}`;

                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{checkInTime.toLocaleString()}</td>
                            <td>
                              {checkOutTime.toLocaleString() ===
                                checkInTime.toLocaleString()
                                ? "-"
                                : checkOutTime.toLocaleString()}
                            </td>
                            <td>{formattedTimeDifference}</td>
                            <td>{h.payment ?? "-"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  "No history found."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}
export default UsersInfo;

