import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import {
  ShowSuccessAlert,
  ShowFailedAlert,
  ShowWarningAlert,
} from "../utilities/toastify";
import $ from "jquery";
import "datatables.net";

export default function Branch(props) {
  const URL = props.url;
  const { loggedInUser } = useAuth();
  const { branchId } = useParams();

  const [branch, setbranch] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios(`${URL}/branches/${branchId}`)
      .then((res) => {
        // if ($.fn.dataTable.isDataTable("#dataTable"))
        //   $("#dataTable").DataTable().destroy();
        setbranch(res.data);
      })
      .then(() => {
        // setTimeout(() => $("#dataTable").DataTable(), 10);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [refresh]);

  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseOne"
          >
            Branch Details
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            <form>
              <div className="form-group col-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={branch.name}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            Analysis
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingTwo"
        >
          <div className="accordion-body">x</div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            Kitchen
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingThree"
        >
          <div className="accordion-body">x</div>
        </div>
      </div>
    </div>
  );
}
