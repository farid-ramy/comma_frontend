import React, { useContext, useState } from "react";
import { LoggedInUserContext } from "../../App";

export default function Dashboard(props) {
  const URL = props.url;
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  return <div>Dashboard</div>;
}
