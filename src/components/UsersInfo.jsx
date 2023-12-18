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



}
