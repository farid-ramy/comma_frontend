import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useUrl } from "../../context/UrlProvider";
import $ from "jquery";
import axios from "axios";
export default function BranchDetails(props) {
  const { url } = useUrl();
  const [branch, setBranch] = useState(null);
  const { branchId } = useParams();

  useEffect(() => {
    axios(`${url}/branches/${branchId}`)
      .then((response) => {
        setBranch(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [branchId]);

  return (
    <div className="card shadow mb-4">
    <div className="card-body">
      <h5 className="card-title">Branch Information</h5>
      {branch ? (
        <div>
          <p className="card-text">Branch ID: {branch.id}</p>
          <p className="card-text">Name: {branch.name}</p>
          <p className="card-text">Phone: {branch.phone}</p>
          <p className="card-text">Opening Hours: {branch.opening_hours}</p>
          <p className="card-text">Created At: {branch.created_at}</p>
          <p className="card-text">Modified At: {branch.modified_at}</p>
        </div>
      ) : (
        <p className="card-text">No branch information available</p>
      )}
    </div>
  </div>
  );
}
