import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import AdminNavbar from "./components/AdminNavbar";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<AdminNavbar />} />
    </Routes>
  );
}
