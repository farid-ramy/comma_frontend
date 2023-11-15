import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Packages from "./Branch/Packages";
import Kitchen from "./Branch/Kitchen";
import BranchDetails from "./Branch/BranchDetails";
import Analysis from "./Branch/Analysis";
import axios from "axios";
import { ShowWarningAlert } from "../utilities/toastify";
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
            <BranchDetails />
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
          <div className="accordion-body">
            <Analysis />
          </div>
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
          <div className="accordion-body">
            <Kitchen />
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingFour">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseFour"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseFour"
          >
            Packages
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingFour"
        >
          <div className="accordion-body">
            <Packages url={URL} />
          </div>
        </div>
      </div>
    </div>
  );
}
