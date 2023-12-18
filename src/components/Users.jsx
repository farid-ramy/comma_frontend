import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUrl } from "../context/UrlProvider";
import axios from "axios";
import { ShowSuccessAlert, ShowWarningAlert } from "../utilities/toastify";
import $ from "jquery";
import "datatables.net";

const Users = () => {
  const { loggedInUser } = useAuth();
  const { url } = useUrl();

  const [refreshTable, setRefreshTable] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [role, setRole] = useState("client");
  const [formData, setFormData] = useState({
    username: null,
    password: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    job: null,
    national_id: null,
    address: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${url}/users/get?role=client`);
        if ($.fn.dataTable.isDataTable("#dataTable")) {
          $("#dataTable").DataTable().destroy();
        }
        setUsersData(res.data);
        setTimeout(() => $("#dataTable").DataTable(), 0);
      } catch (error) {
        ShowWarningAlert("Please check your connection or try again later");
      }
    };

    fetchData();
  }, [refreshTable, url]);

  const handleDeleteBtn = (user) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${user.first_name} ${user.last_name}?`
    );

    if (confirmation) {
      axios
        .delete(`${url}/users/${user.id}/delete`)
        .then(() => {
          setRefreshTable(!refreshTable);
          ShowSuccessAlert(
            `${user.first_name} ${user.last_name} was deleted successfully`
          );
        })
        .catch(() => {
          ShowWarningAlert("Please check your connection or try again later");
        });
    }
  };



}
