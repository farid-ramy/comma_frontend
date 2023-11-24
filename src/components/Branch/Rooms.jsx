import React, { useState } from "react";
import axios from "axios";
import { useUrl } from "../../context/UrlProvider";
import { ShowSuccessAlert, ShowWarningAlert } from "../../utilities/toastify";
import { useParams } from "react-router-dom";
import $ from "jquery";
export default function Rooms() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const { url } = useUrl();
  const { branchId } = useParams();
  const [refreshTable, setRefreshTable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !branch)
      return ShowWarningAlert("Fill all the important fields");

    axios
      .post(`${url}/rooms/create`, {
        name,
        branch: branchId,
      })
      .then((res) => {
        if (!res.data.id)
          return ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);
        ShowSuccessAlert("Room added successfully");
        setRefreshTable(!refreshTable);
        $("#myForm")[0].reset();
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        create new room
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new Room
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="myForm" onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">
                      Name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="branch">
                      Branch ID<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="branch"
                      value={branch}
                      onChange={(e) =>
                        /^\d*$/.test(e.target.value.trim()) &&
                        setBranch(e.target.value.trim())
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
