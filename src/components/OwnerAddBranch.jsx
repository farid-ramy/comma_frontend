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





};
