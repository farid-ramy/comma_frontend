import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import AdminNavbar from "./components/admin/AdminNavbar";
import Dashboard from "./components/admin/Dashboard";
import AddUser from "./components/admin/AddUser";
import ViewAllUsers from "./components/admin/ViewAllUsers";
import AddPackage from "./components/admin/AddPackage";
import ViewAllPackages from "./components/admin/ViewAllPackages";
import AddBranch from "./components/admin/AddBranch";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="admin" element={<AdminNavbar />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add_user" element={<AddUser />} />
        <Route path="view_all_users" element={<ViewAllUsers />} />
        <Route path="add_package" element={<AddPackage />} />
        <Route path="view_all_packages" element={<ViewAllPackages />} />
        <Route path="add_branch" element={<AddBranch />} />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
