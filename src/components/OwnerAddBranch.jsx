import React, { useEffect, useState } from "react";
import { useUrl } from "../context/UrlProvider";
import axios from "axios";
import { ShowSuccessAlert, ShowWarningAlert } from "../utilities/toastify";

export default function AddBranch(props) {
  const { url } = useUrl();

  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [workingEmployee, setWorkingEmployee] = useState(null);

  useEffect(() => {
    axios(`${url}/users/get`)
      .then((res) => {
        setEmployees(
          res.data.filter((user) => {
            return user.role === "admin" || user.role === "manager";
          })
        );
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return ShowWarningAlert("Please enter the branch name");

    try {
      const res1 = await axios.post(`${url}/branches/create`, {
        name: name || null,
        address: address || null,
        phone: phone || null,
      });

      if (!res1.data.id)
        return ShowWarningAlert(res1.data[Object.keys(res1.data)[0]][0]);

      if (workingEmployee && Object.keys(workingEmployee).length > 0) {
        const res2 = await axios.put(
          `${url}/users/${workingEmployee.id}/update`,
          {
            role: workingEmployee.role,
            first_name: workingEmployee.first_name,
            last_name: workingEmployee.last_name,
            branch: res1.data.id,
          }
        );

        if (!res2.data.id)
          return ShowWarningAlert(res2.data[Object.keys(res2.data)[0]][0]);
      }

      ShowSuccessAlert("Branch added successfully");
      props.setReRenderNavbar(!props.reRenderNavbar);
    } catch {
      ShowWarningAlert("Please check your connection or try again later");
    }
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 col-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput2"
                value={address || ""}
                onChange={(e) => setAddress(e.target.value.trim())}
              />
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                pattern="[0-9]*"
                className="form-control"
                id="phone"
                value={phone || ""}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value.trim())) {
                    setPhone(e.target.value.trim());
                  }
                }}
              />
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="workingEmployee">Working employee</label>

              <select
                id="workingEmployee"
                className="form-select"
                onChange={(e) => setWorkingEmployee(JSON.parse(e.target.value))}
              >
                <option value={JSON.stringify({})}>None</option>
                {employees.map((employee) => (
                  <option value={JSON.stringify(employee)} key={employee.id}>
                    {employee.first_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <div className="col-4 d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button type="reset" className="btn btn-secondary">
                  cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
