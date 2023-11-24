import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUrl } from "../../context/UrlProvider";
import $ from "jquery";
import { ShowSuccessAlert, ShowWarningAlert } from "../../utilities/toastify";
import { useParams } from "react-router-dom";




export default function Rooms() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { url } = useUrl();
  const { branchId } = useParams();
  const [refreshTable, setRefreshTable] = useState(false);





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
        <form id="myForm">
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
}