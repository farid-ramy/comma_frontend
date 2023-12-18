import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";
import { ShowWarningAlert } from "../utilities/toastify";
import useAuth from "../hooks/useAuth";
import { useUrl } from "../context/UrlProvider";

export default function CheckedIn(props) {
  const { url } = useUrl();
  const { loggedInUser } = useAuth();

  const [usersData, setUsersData] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkedInUsers, setcheckedInUsers] = useState([]);

  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [reload, setReload] = useState(false);
  const [checkedInRecord, setCheckedInRecord] = useState({});
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [totalTime, SetTotalTime] = useState(0);



  useEffect(() => {
    // get all the users data for the search bar
    axios(`${url}/users/get?role=client`)
      .then((res) => setUsersData(res.data))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
    // get all the products in the branch
    axios(`${url}/products?branch_id=${loggedInUser.branch.id}`)
      .then((res) => setProducts(res.data))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, []);

  useEffect(() => {
    // get all the user that are checkined in the branch and not check out
    axios(
      `${url}/history?branch_id=${loggedInUser.branch.id}&check_out_time=null`
    )
      .then((res) => {
        if ($.fn.dataTable.isDataTable("#dataTable"))
          $("#dataTable").DataTable().destroy();
        setcheckedInUsers(res.data);
      })
      .then(() => setTimeout(() => $("#dataTable").DataTable(), 10))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [reload]);


  const handleChange = async (value) => {
    setInput(value);
    if (value) {
      const results = usersData.filter((user) => {
        const isNotCheckedIn = !checkedInUsers.some(
          (checkedUser) => checkedUser.client.id === user.id
        );

        return (
          isNotCheckedIn &&
          (user.id.toString()?.toLowerCase()?.includes(value) ||
            user.first_name?.toLowerCase()?.includes(value) ||
            user.last_name?.toLowerCase()?.includes(value) ||
            user.phone?.toLowerCase()?.includes(value) ||
            user.national_id?.toLowerCase()?.includes(value))
        );
      });
      setResults(results);
    } else {
      setResults([]);
    }
  };


  const handleStart = (user) => {
    axios
      .post(`${url}/history/create`, {
        client: user.id,
        employee: loggedInUser.id,
        branch: loggedInUser.branch.id,
      })
      .then((res) => {
        if (res.data.error) {
          return ShowWarningAlert(res.data.error);
        }
        handleChange("");
        setReload(!reload);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };


  const handleCheckOutBtn = (e) => {
    e.preventDefault();
    const payment = () => {
      const totalPayment = orderedProducts.reduce(
        (acc, orderedProduct) =>
          acc + orderedProduct.quantity * orderedProduct.product.price,
        0
      );

      return totalPayment + totalTime;
    };

    axios
      .put(`${url}/history/${checkedInRecord.id}/update`, {
        check_out_time: new Date().toISOString(),
        payment: payment(),
      })
      .then((res) => {
        if (res.error) ShowWarningAlert(res.error);
        setReload(!reload);
        $("#exampleModal").modal("hide");
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };



}