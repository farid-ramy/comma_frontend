import React, { useEffect, useState } from "react";
import { useUrl } from "../context/UrlProvider";
import axios from "axios";
import { ShowSuccessAlert, ShowWarningAlert } from "../utilities/toastify";


const AddBranch = (props) => {
  const { url } = useUrl();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    workingEmployee: null,
  });


  useEffect(() => {
    axios(`${url}/users/get`)
      .then((res) => {
        const filteredEmployees = res.data.filter(
          (user) => user.role === "admin" || user.role === "manager"
        );
        setEmployees(filteredEmployees);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [url]);


  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) return ShowWarningAlert("Please enter the branch name");

    try {
      const branchResponse = await axios.post(`${url}/branches/create`, {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
      });

      if (!branchResponse.data.id)
        return ShowWarningAlert(
          branchResponse.data[Object.keys(branchResponse.data)[0]][0]
        );

      if (
        formData.workingEmployee &&
        Object.keys(formData.workingEmployee).length > 0
      ) {
        const employeeResponse = await axios.put(
          `${url}/users/${formData.workingEmployee.id}/update`,
          {
            role: formData.workingEmployee.role,
            first_name: formData.workingEmployee.first_name,
            last_name: formData.workingEmployee.last_name,
            branch: branchResponse.data.id,
          }
        );

        if (!employeeResponse.data.id)
          return ShowWarningAlert(
            employeeResponse.data[Object.keys(employeeResponse.data)[0]][0]
          );
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
              <label htmlFor="branchName" className="form-label">
                Name <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="branchName"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="branchAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="branchAddress"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                pattern="[0-9]*"
                className="form-control"
                id="phone"
                value={formData.phone}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value.trim())) {
                    handleInputChange("phone", e.target.value.trim());
                  }
                }}
              />
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="workingEmployee">Working employee</label>
              <select
                id="workingEmployee"
                className="form-select"
                onChange={(e) =>
                  handleInputChange(
                    "workingEmployee",
                    JSON.parse(e.target.value)
                  )
                }
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
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={() =>
                    setFormData({
                      name: "",
                      address: "",
                      phone: "",
                      workingEmployee: null,
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );



};
