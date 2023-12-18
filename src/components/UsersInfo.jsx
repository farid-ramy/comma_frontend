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

}
