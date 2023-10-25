import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";

export default function AddBranch(props) {
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
          + Add Branch
        </button>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {/* page content  */



          }
        </div>
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
                Add new User
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
                    <label htmlFor="firstName">
                      First Name
                      <span className="text-danger"> * </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastName">
                      Last Name
                      <span className="text-danger"> * </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="Email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      className="form-control"
                      id="phone"
                      placeholder="phone"
                    />
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
