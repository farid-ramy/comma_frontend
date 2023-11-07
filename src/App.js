import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import AdminNavbar from "./components/admin/AdminNavbar";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/Users";
import Packages from "./components/admin/Packages";
import AddBranch from "./components/admin/AddBranch";
import UsersInfo from "./components/UsersInfo";
import EmployeeNavbar from "./components/employee/EmployeeNavbar";
import CheckedIn from "./components/employee/CheckedIn";
import Branch from "./components/employee/Branch";
import { createContext, useState } from "react";
import PrivateRoutes from "./utilities/PrivateRoutes";

const URL = "http://127.0.0.1:8000/api";

export const LoggedInUserContext = createContext();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="admin" element={<AdminNavbar url={URL} />}>
            <Route path="dashboard" element={<Dashboard url={URL} />} />
            <Route path="users" element={<Users url={URL} />} />
            <Route path="user_info/:userId" element={<UsersInfo url={URL} />} />
            <Route path="packages" element={<Packages url={URL} />} />
            <Route path="add_branch" element={<AddBranch url={URL} />} />
          </Route>
          <Route path="employee" element={<EmployeeNavbar url={URL} />}>
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
