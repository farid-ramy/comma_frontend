import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ShowSuccessAlert = (msg, obj = null) => {
  toast.success(msg, obj);
};

export const ShowFailedAlert = (msg, obj = null) => {
  toast.error(msg, obj);
};

export const ShowWarningAlert = (msg, obj = null) => {
  toast.warning(msg, obj);
};
