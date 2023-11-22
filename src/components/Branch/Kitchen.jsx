import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUrl } from "../../context/UrlProvider";
import $ from "jquery";
import { ShowSuccessAlert, ShowWarningAlert } from "../../utilities/toastify";

export default function Kitchen() {
  const { url } = useUrl();
  const { branchId } = useParams();

  const [refreshTable, setRefreshTable] = useState(false);

  const [productsData, setProductsData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  useEffect(() => {
    axios(`${url}/products?branch=${branchId}`)
      .then((res) => {
        if ($.fn.dataTable.isDataTable("#dataTable"))
          $("#dataTable").DataTable().destroy();
        setProductsData(res.data);
      })
      .then(() => {
        setTimeout(() => $("#dataTable").DataTable(), 10);
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [refreshTable, branchId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !quantity)
      return ShowWarningAlert("Fill all the important fields");

    axios
      .post(`${url}/products/create`, {
        name,
        price,
        quantity,
        branch: branchId,
      })
      .then((res) => {
        if (!res.data.id)
          return ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);
        ShowSuccessAlert("Product added successfully");
        setRefreshTable(!refreshTable);
        $("#exampleModal").modal("hide");
        $("#myForm")[0].reset();
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you should you want to delete ${product.name}  ?`))
      axios
        .delete(`${url}/products/${product.id}/delete`)
        .then(() => {
          setRefreshTable(!refreshTable);
          ShowSuccessAlert(`${product.name}  was deleted successfully`);
        })
        .catch(() =>
          ShowWarningAlert("Please check your connection or try again later")
        );
  };

  const handleEdite = (product) => {
    const updatedProducts = productsData.map((p) =>
      p.id === product.id
        ? { ...p, isEditing: true }
        : { ...p, isEditing: false }
    );
    setNewPrice(product.price);
    setNewQuantity(product.quantity);
    setProductsData(updatedProducts);
  };

  const handleX = (product) => {
    const updatedProducts = productsData.map((p) =>
      p.id === product.id ? { ...p, isEditing: false } : p
    );
    setProductsData(updatedProducts);
  };

  const handlecheck = (product) => {
    if (!newPrice || !newQuantity)
      return ShowWarningAlert("Fill all the fields");

    axios
      .put(`${url}/products/${product.id}/update`, {
        name: product.name,
        price: newPrice,
        quantity: newQuantity,
        branch: branchId,
      })
      .then((res) => {
        if (!res.data.id)
          return ShowWarningAlert(res.data[Object.keys(res.data)[0]][0]);

        ShowSuccessAlert(`${product.name} updated successfully`);
        setRefreshTable(!refreshTable);
        $("#exampleModal").modal("hide");
        $("#myForm")[0].reset();
      })
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  };

  return (
    <div>
      <div className="d-flex flex-row-reverse mb-3">
        <button
          type="button"
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          + Add product
        </button>
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
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      {product.isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          value={newQuantity}
                          onChange={(e) =>
                            /^(\d*\.?\d*)$/.test(e.target.value.trim()) &&
                            setNewQuantity(e.target.value.trim())
                          }
                        />
                      ) : (
                        product.quantity
                      )}
                    </td>
                    <td>
                      {product.isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          value={newPrice}
                          onChange={(e) =>
                            /^(\d*\.?\d*)$/.test(e.target.value.trim()) &&
                            setNewPrice(e.target.value.trim())
                          }
                        />
                      ) : (
                        product.price
                      )}
                    </td>
                    <td>
                      {product.isEditing ? (
                        <button
                          className="text-success border-0 bg-color bg-transparent"
                          onClick={() => handlecheck(product)}
                        >
                          <i class="fa-solid fa-check"></i>
                        </button>
                      ) : (
                        <button
                          className="text-danger border-0 bg-color bg-transparent"
                          onClick={() => handleDelete(product)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      )}

                      {product.isEditing ? (
                        <button
                          className="text-danger border-0 bg-color bg-transparent"
                          onClick={() => handleX(product)}
                        >
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                      ) : (
                        <button
                          className="text-secondary border-0 bg-color bg-transparent"
                          onClick={() => handleEdite(product)}
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                Add new Product
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
                      Name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={(e) => setName(e.target.value.trim())}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="price">
                      Price<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Price"
                      value={price}
                      onChange={(e) =>
                        /^\d*$/.test(e.target.value.trim()) &&
                        setPrice(e.target.value.trim())
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="quantity">
                      Quantity<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="quantity"
                      value={quantity}
                      onChange={(e) =>
                        /^\d*$/.test(e.target.value.trim()) &&
                        setQuantity(e.target.value.trim())
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
