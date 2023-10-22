import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import AdminNavbar from "./components/admin/AdminNavbar";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/Users";
import Packages from "./components/admin/Packages";
import AddBranch from "./components/admin/AddBranch";
import UsersInfo from "./components/UsersInfo";

const URL = "http://127.0.0.1:8000/api";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login url={URL} />} />
      <Route path="admin" element={<AdminNavbar />}>
        <Route path="dashboard" element={<Dashboard url={URL} />} />
        <Route path="users" element={<Users url={URL} />} />
        <Route path="user_info/:userId" element={<UsersInfo url={URL} />} />
        <Route path="packages" element={<Packages url={URL} />} />
        <Route path="add_branch" element={<AddBranch url={URL} />} />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
