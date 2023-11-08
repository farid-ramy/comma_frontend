import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import AdminNavbar from "./components/owner/AdminNavbar";
import Dashboard from "./components/owner/Dashboard";
import Users from "./components/Users";
import Packages from "./components/owner/Packages";
import AddBranch from "./components/owner/AddBranch";
import UsersInfo from "./components/UsersInfo";
import EmployeeNavbar from "./components/admin/EmployeeNavbar";
import CheckedIn from "./components/admin/CheckedIn";
import Branch from "./components/admin/Branch";
import { createContext, useState } from "react";
import PrivateRoutes from "./utilities/PrivateRoutes";

const URL = "http://127.0.0.1:8000/api";

export const LoggedInUserContext = createContext();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [reload, setReload] = useState(false);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="owner"
            element={<AdminNavbar url={URL} reload={reload} />}
          >
            <Route path="dashboard" element={<Dashboard url={URL} />} />
            <Route path="users" element={<Users url={URL} />} />
            <Route path="user_info/:userId" element={<UsersInfo url={URL} />} />
            <Route path="packages" element={<Packages url={URL} />} />
            <Route
              path="add_branch"
              element={
                <AddBranch url={URL} reload={reload} setReload={setReload} />
              }
            />
          </Route>
          <Route path="admin" element={<EmployeeNavbar url={URL} />}>
            <Route path="checkedIn" element={<CheckedIn url={URL} />} />
            <Route path="users" element={<Users url={URL} />} />
            <Route path="branch" element={<Branch url={URL} />} />
          </Route>
        </Route>
        <Route path="/" element={<Login url={URL} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </LoggedInUserContext.Provider>
  );
}
