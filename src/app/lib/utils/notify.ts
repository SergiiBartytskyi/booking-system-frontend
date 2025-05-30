import { toast } from "react-toastify";

interface NotifyType {
  message: string;
  type: "error" | "success" | "info";
}

export const notify = ({ message, type }: NotifyType) => {
  const id = `toast-${Date.now()}`;

  switch (type) {
    case "error":
      toast.error(message, { toastId: id });
      break;
    case "success":
      toast.success(message, { toastId: id });
      break;
    case "info":
      toast.info(message, { toastId: id });
      break;
    default:
      toast(message, { toastId: id }); //
  }
};
