import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";

import Users from "./components/Users";
import UsersInfo from "./components/UsersInfo";
import Packages from "./components/Branch/Packages";
import CheckedIn from "./components/CheckedIn";
import Branch from "./components/Branch";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import OwnerAddBranch from "./components/OwnerAddBranch";

import RequireAuth from "./utilities/RequireAuth";

export default function App() {
  const [reRenderNavbar, setReRenderNavbar] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<RequireAuth />}>
        <Route
          path="owner"
          element={<Navbar reRenderNavbar={reRenderNavbar} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="user_info/:userId" element={<UsersInfo />} />
          <Route path="packages" element={<Packages />} />
          <Route
            path="add_branch"
            element={
              <OwnerAddBranch
                reRenderNavbar={reRenderNavbar}
                setReRenderNavbar={`setReRenderNavbar`}
              />
            }
          />
          <Route path="branch/:branchId" element={<Branch />} />
        </Route>
        <Route path="admin" element={<Navbar />}>
          <Route path="checkedIn" element={<CheckedIn />} />
          <Route path="users" element={<Users />} />
          <Route path="user_info/:userId" element={<UsersInfo />} />
          <Route path="packages" element={<Packages />} />
          <Route path="branch/:branchId" element={<Branch />} />
        </Route>
        <Route path="manager" element={<Navbar />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="checkedIn" element={<CheckedIn />} />
          <Route path="users" element={<Users />} />
          <Route path="user_info/:userId" element={<UsersInfo />} />
          <Route path="packages" element={<Packages />} />
          <Route path="branch/:branchId" element={<Branch />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
