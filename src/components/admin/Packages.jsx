import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";


export default function Packages(props) {
  const URL = props.url;
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [packages, setPackages] = useState([]);
  const [viewingPackage, setViewingPackage] = useState(null);




  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price || !description) {
      setError("Fill all the important fields");
      return;
    } else setError("");
    try {
      const res = await axios.post(`${URL}/packages/add`, {
        name: name,
        price: price,

      });
      if (!res.data.id) setError(res.data[Object.keys(res.data)[0]][0]);
      else window.location.reload();
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/packages`);
        setPackages(res.data);
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, []);
  async function viewPackage(pkg) {
    setViewingPackage(pkg);
  }
  async function closeView() {
    setViewingPackage(null);
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
      {/* the code for the view  */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row">
            {packages.map((pkg) => (
              <div className="col-sm-6 mb-3 mb-sm-0" key={pkg.id}>
                <div className="card">
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
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*write the view part here  */}




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
                      onChange={(e) => setPrice(e.target.value.trim())}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value.trim())}
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
