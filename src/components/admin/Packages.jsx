import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShowFailedAlert,
  ShowSuccessAlert,
  ShowWarningAlert,
} from "../../utilities/toastify";

export default function Packages(props) {
  const URL = props.url;
  const [reload, setReload] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [packages, setPackages] = useState([]);
  const [viewingPackage, setViewingPackage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price) {
      ShowWarningAlert("Fill all the important fields");
      return;
    }
    try {
      const res = await axios.post(`${URL}/packages/add`, {
        name: name,
        price: price,
      });
      if (!res.data.id) ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);
      else setReload(!reload);
    } catch (error) {
      ShowFailedAlert(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/packages`);
        setPackages(res.data);
      } catch (error) {
        ShowFailedAlert(error);
      }
    };

    fetchData();
  }, [reload]);

  async function viewPackage(pkg) {
    setViewingPackage(pkg);
  }

  async function closeView() {
    setViewingPackage(null);
  }

  const handleDelete = (pkg) => {
    if (window.confirm(`Are you should you want to delete ${pkg.name} ?`))
      axios
        .delete(`${URL}/packages/delete/${pkg.id}`)
        .then(() => {
          setReload(!reload);
          ShowSuccessAlert(`${pkg.name}  was deleted successfully`);
          closeView();
        })
        .catch((error) => ShowFailedAlert(error));
  };

  const handleUpdate = (pkg) => {
    
  };

  return (
    <div className="container-fluid">
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
      {viewingPackage && (
        <div className="card shadow mb-4">
          <div className="card-body">
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Close"
              onClick={closeView}
            ></button>
            <h3>Package Details</h3>
            <p>
              <strong>Name:</strong> {viewingPackage.name}
            </p>
            <p>
              <strong>Price:</strong> ${viewingPackage.price}
            </p>
            <p>
              <strong>Description:</strong>
              {viewingPackage.description ?? "-"}
            </p>
            <button
              className="btn btn-success mr-2"
              onClick={() => handleUpdate(viewingPackage)}
            >
              Update
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => handleDelete(viewingPackage)}
            >
              delete
            </button>
          </div>
        </div>
      )}
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row">
            {packages.map((pkg) => (
              <div className="card m-3 col-3" key={pkg.id}>
                <div className="card-body">
                  <h5 className="card-title">{pkg.name}</h5>
                  <p className="card-text">Price: ${pkg.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => viewPackage(pkg)}
                  >
                    View Package
                  </button>
                </div>
              </div>
            ))}
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
            <form onSubmit={handleSubmit}>
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
                      value={name}
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
                <div className="form-group col-md-12">
                  <label htmlFor="floatingTextarea2">Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Description.."
                    id="floatingTextarea2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.trim())}
                  ></textarea>
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
