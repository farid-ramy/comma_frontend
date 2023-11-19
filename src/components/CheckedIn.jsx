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

      return totalPayment;
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

  const handleDeleteBtn = (checkedInRecord) => {
    if (
      window.confirm(
        `Are you should you want to delete ${checkedInRecord.client.first_name} ${checkedInRecord.client.last_name} ?`
      )
    ) {
      axios
        .delete(`${url}/history/${checkedInRecord.id}/delete`)
        .then((res) => {
          if (res.error) ShowWarningAlert(res.error);
          setReload(!reload);
        })
        .catch(() =>
          ShowWarningAlert("Please check your connection or try again later")
        );
    }
  };

  return (
    <div>
      <div
        className="modal fade bd-example-modal-lg"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="myLargeModalLabel">
                Check Out
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={function resetInputs() {
                  const inputs = document.querySelectorAll("input");

                  inputs.forEach((input) => {
                    switch (input.type) {
                      case "text":
                        input.value = "";
                        break;
                      case "number":
                        input.value = "";
                        break;
                      default:
                        input.value = "";
                    }
                  });
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div
                  className="col-6 border-right overflow-auto"
                  style={{ maxHeight: "calc(100vh - 250px)" }}
                >
                  <div style={{ width: "fit-content" }}>
                    {products
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((product) => (
                        <div
                          key={product.id}
                          className="mb-2 d-flex justify-content-between"
                        >
                          <p className="text-capitalize h5 px-2 ">
                            {product.name}
                            <span className="h6 font-italic font-weight-light pl-2">
                              ({product.price} E£)
                            </span>
                            :
                          </p>
                          <input
                            type="number"
                            min={0}
                            style={{ width: "50px" }}
                            onChange={(e) => {
                              const quantity =
                                parseInt(e.target.value, 10) || 0;

                              setOrderedProducts((prevProducts) => {
                                if (quantity === 0) {
                                  return prevProducts.filter(
                                    (orderedProduct) =>
                                      orderedProduct.product.id !== product.id
                                  );
                                }

                                const existingProductIndex =
                                  prevProducts.findIndex(
                                    (orderedProduct) =>
                                      orderedProduct.product.id === product.id
                                  );

                                if (existingProductIndex !== -1) {
                                  const updatedProducts = [...prevProducts];
                                  updatedProducts[
                                    existingProductIndex
                                  ].quantity = quantity;
                                  return updatedProducts;
                                } else {
                                  return [
                                    ...prevProducts,
                                    {
                                      product,
                                      quantity,
                                    },
                                  ];
                                }
                              });
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6">
                      <p className="h5">Check In :</p>
                    </div>
                    <div className="col-6">
                      {((date) =>
                        `${String(date.getHours()).padStart(2, "0")}:${String(
                          date.getMinutes()
                        ).padStart(2, "0")} - ${String(date.getDate()).padStart(
                          2,
                          "0"
                        )}/${String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        )}/${date.getFullYear()}`)(
                        new Date(checkedInRecord.check_in_time)
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <p className="h5">Check Out :</p>
                    </div>
                    <div className="col-6">
                      {((date) =>
                        `${String(date.getHours()).padStart(2, "0")}:${String(
                          date.getMinutes()
                        ).padStart(2, "0")} - ${String(date.getDate()).padStart(
                          2,
                          "0"
                        )}/${String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        )}/${date.getFullYear()}`)(new Date())}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-6">
                      <p className="h5">Estimated time :</p>
                    </div>
                    <div className="col-6">
                      {(() => {
                        const checkInTime = new Date(
                          checkedInRecord.check_in_time
                        );
                        const checkOutTime = new Date();

                        const timeDifference = checkOutTime - checkInTime;
                        const hours = Math.floor(
                          timeDifference / (1000 * 60 * 60)
                        );
                        const minutes = Math.floor(
                          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                        );

                        let result = "";
                        if (hours > 0) {
                          result += `${hours} ${
                            hours === 1 ? "hour" : "hours"
                          }`;
                        }
                        if (minutes > 0) {
                          result += `${
                            result.length ? " and " : ""
                          }${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
                        }

                        return result || "0 minutes";
                      })()}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-12">
                      <p className="h3 mb-4">Receipt:</p>
                      {orderedProducts.map((orderedProduct) => (
                        <div
                          key={orderedProduct.product.id}
                          className="d-flex justify-content-between"
                        >
                          <span className="text-capitalize">
                            {orderedProduct.product.name}
                          </span>
                          <span>
                            {orderedProduct.quantity} x{" "}
                            {orderedProduct.product.price}{" "}
                          </span>
                        </div>
                      ))}
                    </div>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-between">
                      <span className="text-capitalize font-weight-bold">
                        Total :
                      </span>
                      <span>
                        {orderedProducts
                          .reduce(
                            (acc, orderedProduct) =>
                              acc +
                              orderedProduct.quantity *
                                orderedProduct.product.price,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                onClick={(e) => {
                  handleCheckOutBtn(e);
                }}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="position-relative mb-3"
        id="search"
        style={{ width: "50%", margin: " 0 auto" }}
      >
        <div className="input-group">
          <input
            type="text"
            placeholder=" Search.. "
            className="form-control rounded-0"
            value={input}
            onChange={(e) => handleChange(e.target.value.trim())}
          />
          <button type="button" className="btn btn-success rounded-0">
            <i className="fas fa-search"></i>
          </button>
        </div>
        {results.length > 0 && (
          <div
            className="position-absolute"
            style={{
              maxHeight: "300px",
              overflow: "scroll",
              zIndex: "2",
              top: "100%",
              left: "50%",
              width: "100%",
              transform: "translateX(-50%)",
            }}
          >
            <table className="table" style={{ boxShadow: "0px 0px 10px gray" }}>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">National Id</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {results.map((user) => {
                  return (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.first_name + " " + user.last_name}</td>
                      <td>
                        {user.phone ? "*****" + user.phone.slice(-4) : "-"}
                      </td>
                      <td>{user.national_id ?? "-"}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleStart(user)}
                        >
                          Start
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Check In</th>
                  <th>Check out</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {checkedInUsers.map((checkedInRecord) => (
                  <tr key={checkedInRecord.client.id}>
                    <td>{checkedInRecord.client.id}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link
                        className="text-dark"
                        to={`../user_info/${checkedInRecord.client.id}`}
                      >
                        {checkedInRecord.client.first_name}{" "}
                        {checkedInRecord.client.last_name}
                      </Link>
                    </td>
                    <td>
                      {checkedInRecord.client.phone
                        ? "*****" + checkedInRecord.client.phone.slice(-4)
                        : "-"}
                      <span className="d-none">
                        {checkedInRecord.client.phone}
                      </span>
                    </td>
                    <td>
                      {checkedInRecord.client.email ? "***" : "-"}
                      <span className="d-none">
                        {checkedInRecord.client.email}
                      </span>
                    </td>
                    <td>
                      {new Date(checkedInRecord.check_in_time).toLocaleString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => {
                          setCheckedInRecord(checkedInRecord);
                          setOrderedProducts([]);
                        }}
                      >
                        Stop
                      </button>
                    </td>
                    <td>
                      <button
                        className="text-danger border-0 bg-color bg-transparent"
                        onClick={() => handleDeleteBtn(checkedInRecord)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
