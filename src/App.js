import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
