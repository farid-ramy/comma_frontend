import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useUrl } from "../../context/UrlProvider";
import $ from "jquery";
import {
  ShowFailedAlert,
  ShowSuccessAlert,
  ShowWarningAlert,
} from "../../utilities/toastify";

export default function BranchDetails(props) {
  const { url } = useUrl();
  const { loggedInUser } = useAuth();
  const [reload, setReload] = useState(false);
  const { branchId } = useParams();

  return <div>{props.branch.name}</div>;
}
