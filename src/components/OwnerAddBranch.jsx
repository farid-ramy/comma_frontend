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





};
