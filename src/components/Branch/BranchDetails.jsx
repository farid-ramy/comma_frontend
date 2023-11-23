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
    <div>
    <h1>Branch Information</h1>
    {branch ? (
      <div>
        <p>Branch ID: {branch.id}</p>
        <p>Name: {branch.name}</p>
      </div>
    ) : (
      <p>No branch information available</p>
    )}
  </div>
  );
}
