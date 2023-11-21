// DataTable.js
import React, { useState, useEffect, useCallback } from 'react';
import { useUrl } from "../../context/UrlProvider";
import $ from "jquery";
import axios from 'axios';
import {
  ShowFailedAlert,
  ShowSuccessAlert,
  ShowWarningAlert,
} from "../../utilities/toastify";

const Products = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { url } = useUrl();
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });
  const [reload, setReload] = useState(false);


  const fetchProducts = () => {
    axios.get(`${url}/products/`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        ShowWarningAlert("Please check your connection or try again later")

      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price)
      return ShowWarningAlert("Fill all the important fields");

    axios
      .post(`${url}/products/create`, {
        name,
        price,
        quantity,
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

  const handleDelete = (productId) => {
    axios.delete(`${url}/products/${productId}/delete`)
      .then(response => {
        console.log('Product deleted successfully:', response.data);
        fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        ShowWarningAlert("Please check your connection or try again later")

      });
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add Product
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add new Product</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} id="myForm">
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Name<span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value.trim())} />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="price">Price<span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value.trim())} />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <label htmlFor="floatingTextarea2">Quantity</label>
                    <textarea className="form-control" placeholder="Quantity" id="floatingTextarea2" value={quantity} onChange={(e) => setQuantity(e.target.value.trim())}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Add</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
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
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        className="text-danger border-0 bg-color bg-transparent"
                        onClick={() => handleDelete(product.id)}
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
export default Products;
