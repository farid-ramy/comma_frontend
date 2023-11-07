import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./vendor/fontawesome-free/css/all.min.css";
import "./css/sb-admin-2.css";
import "./vendor/datatables/dataTables.bootstrap4.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./vendor/jquery/jquery.min.js";
import "./vendor/bootstrap/js/bootstrap.bundle.min.js";
import "./vendor/jquery-easing/jquery.easing.min.js";
import "./vendor/datatables/jquery.dataTables.min.js";
import "./vendor/datatables/dataTables.bootstrap4.min.js";
import "./js/demo/datatables-demo.js";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
