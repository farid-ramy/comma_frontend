import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";
import { ShowWarningAlert } from "../utilities/toastify";
import useAuth from "../hooks/useAuth";
import { useUrl } from "../context/UrlProvider";

export default function CheckedIn(props) {
  const { url } = useUrl();
  const { loggedInUser } = useAuth();

  const [usersData, setUsersData] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkedInUsers, setcheckedInUsers] = useState([]);

  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [reload, setReload] = useState(false);
  const [checkedInRecord, setCheckedInRecord] = useState({});
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [totalTime, SetTotalTime] = useState(0);


}