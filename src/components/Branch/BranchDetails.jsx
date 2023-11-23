import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useUrl } from "../../context/UrlProvider";
import $ from "jquery";
import axios from "axios";
import ReactTable from 'react-table';

export default function BranchDetails(props) {
  const { url } = useUrl();
  const [branch, setBranch] = useState(null);
  const { branchId } = useParams();
  const [users, setUsers] = useState([]);
const [packages, setPackages] = useState([]);
const [rooms, setRooms] = useState([]);
const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios(`${url}/branches/${branchId}`)
      .then((response) => {
        setBranch(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [branchId]);  
  useEffect(() => {
    // Fetch users
    axios(`${url}/branches/${branchId}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Fetch packages
    axios(`${url}/branches/${branchId}/packages`)
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Fetch rooms
    axios(`${url}/branches/${branchId}/rooms`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Fetch reservations
    axios(`${url}/branches/${branchId}/reservations`)
      .then((response) => {
        setReservations(response.data);
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
