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



};
