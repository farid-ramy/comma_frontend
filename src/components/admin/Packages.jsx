import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";

export default function Packages(props) {
  const URL = props.url;
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="container-fluid">
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />

      <div className="d-flex flex-row-reverse">
        <button
          type="button"
          className="btn btn-secondary mb-3"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          + Add Package
        </button>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">{/* page content  */}</div>
      </div>

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
                Add new Package
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
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <p className="h6 text-danger mb-4 text-center">{error}</p>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">
                      Name
                      <span className="text-danger"> * </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="price">
                      Price
                      <span className="text-danger"> * </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label for="floatingTextarea2">Description</label>
                    <textarea
                      class="form-control"
                      placeholder="Description.."
                      id="floatingTextarea2"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
