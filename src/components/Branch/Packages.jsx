import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useUrl } from "../../context/UrlProvider";
import $ from "jquery";
import { ShowSuccessAlert, ShowWarningAlert } from "../../utilities/toastify";

export default function Packages() {
  const { url } = useUrl();
  const { loggedInUser } = useAuth();
  const [reload, setReload] = useState(false);
  const { branchId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [packages, setPackages] = useState([]);
  const [viewingPackage, setViewingPackage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price)
      return ShowWarningAlert("Fill all the important fields");

    axios
      .post(`${url}/packages/create`, {
        name,
        price,
        description,
        branch: branchId,
      })
      .then((res) => {
        if (!res.data.id)
          return ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);
        else {
          setReload(!reload);
          $("#exampleModal").modal("hide");
          $("#myForm")[0].reset();
        }
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  useEffect(() => {
    axios(`${url}/packages?branch=${branchId}`)
      .then((res) => setPackages(res.data))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [reload, branchId]);

  const handleDelete = (pkg) => {
    if (window.confirm(`Are you should you want to delete ${pkg.name} ?`))
      axios
        .delete(`${url}/packages/${pkg.id}/delete`)
        .then(() => {
          setReload(!reload);
          ShowSuccessAlert(`${pkg.name}  was deleted successfully`);
          setViewingPackage(null);
        })
        .catch(() =>
          ShowWarningAlert("Please check your connection or try again later")
        );
  };

  return (
    <div>
      {loggedInUser.role === "owner" && (
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
      )}
      {viewingPackage && (
        <div className="card shadow mb-4">
          <div className="card-body">
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Close"
              onClick={() => setViewingPackage(null)}
            ></button>
            <h3>Package Details</h3>
            <p>
              <strong>Name:</strong> {viewingPackage.name}
            </p>
            <p>
              <strong>Price:</strong> ${viewingPackage.price}
            </p>
            <p>
              <strong>Description: </strong>
              {viewingPackage.description ? viewingPackage.description : " - "}
            </p>
            {loggedInUser.role === "owner" && (
              <button
                className="btn btn-danger ml-2 float-end"
                onClick={() => handleDelete(viewingPackage)}
              >
                delete
              </button>
            )}
          </div>
        </div>
      )}
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row">
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <div className="card m-3 col-3" key={pkg.id}>
                  <div className="card-body">
                    <h5 className="card-title">{pkg.name}</h5>
                    <p className="card-text">Price: ${pkg.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setViewingPackage(pkg)}
                    >
                      View Package
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-3">No packages found</p>
            )}
          </div>
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
            <form onSubmit={handleSubmit} id="myForm">
              <div className="modal-body">
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
                      onChange={(e) => setName(e.target.value.trim())}
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
                      value={price}
                      onChange={(e) => {
                        if (/^\d*$/.test(e.target.value.trim())) {
                          setPrice(e.target.value.trim());
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <label htmlFor="floatingTextarea2">Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Description.."
                      id="floatingTextarea2"
                      onChange={(e) => setDescription(e.target.value.trim())}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button type="reset" className="btn btn-secondary">
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
