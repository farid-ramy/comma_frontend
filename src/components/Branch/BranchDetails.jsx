import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useUrl } from "../../context/UrlProvider";

export default function BranchDetails(props) {
  const { url } = useUrl();
  const { loggedInUser } = useAuth();

  return (
    <div>
      <p>{props.branch.name} </p>
    </div>
  );
}
