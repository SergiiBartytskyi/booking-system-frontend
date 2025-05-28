import { AxiosError } from "axios";
import { notify } from "./notify";

export const handleAxiosError = (error: unknown) => {
  const axiosError = error as AxiosError<{ data?: { message?: string } }>;

  const message =
    axiosError.response?.data?.data?.message || "Щось пішло не так ... ";
  notify({ message, type: "error" });
};
