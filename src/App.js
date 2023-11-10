import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";

import Users from "./components/Users";
import UsersInfo from "./components/UsersInfo";
import Packages from "./components/Packages";
import CheckedIn from "./components/CheckedIn";
import Branch from "./components/Branch";
import Navbar from "./components/Navbar";

import OwnerDashboard from "./components/owner/OwnerDashboard";
import OwnerAddBranch from "./components/owner/OwnerAddBranch";

import ManagerDashboard from "./components/manager/ManagerDashboard";
import RequireAuth from "./utilities/RequireAuth";

const URL = "http://127.0.0.1:8000/api";

export default function App() {
  const [reload, setReload] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login url={URL} />} />

      <Route element={<RequireAuth />}>
        <Route path="owner" element={<Navbar url={URL} reload={reload} />}>
          <Route path="dashboard" element={<OwnerDashboard url={URL} />} />
          <Route path="users" element={<Users url={URL} />} />
          <Route path="user_info/:userId" element={<UsersInfo url={URL} />} />
          <Route path="packages" element={<Packages url={URL} />} />
          <Route
            path="add_branch"
            element={
              <OwnerAddBranch url={URL} reload={reload} setReload={setReload} />
            }
          />
          <Route path="branch/:branchId" element={<Branch url={URL} />} />
        </Route>
        <Route path="admin" element={<Navbar url={URL} />}>
          <Route path="checkedIn" element={<CheckedIn url={URL} />} />
          <Route path="users" element={<Users url={URL} />} />
          <Route path="user_info/:userId" element={<UsersInfo url={URL} />} />
          <Route path="packages" element={<Packages url={URL} />} />
          <Route path="branch/:branchId" element={<Branch url={URL} />} />
        </Route>
        <Route path="manager" element={<Navbar url={URL} />}>
          <Route path="dashboard" element={<ManagerDashboard url={URL} />} />
          <Route path="checkedIn" element={<CheckedIn url={URL} />} />
          <Route path="users" element={<Users url={URL} />} />
          <Route path="user_info/:userId" element={<UsersInfo url={URL} />} />
          <Route path="packages" element={<Packages url={URL} />} />
          <Route path="branch/:branchId" element={<Branch url={URL} />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
