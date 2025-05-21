import axios from "axios";
import { RegistrationFieldValues } from "../components/registration-form";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export enum Role {
  CLIENT = "client",
  BUSINESS = "business",
}

export enum Status {
  SCHEDULED = "scheduled",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export const registerUser = async (userData: RegistrationFieldValues) =>
  await api.post("/auth/signup", userData);

// export const loginUserApi = async (userData: ILoginCredentials) =>
//   await api.post("/auth/signin", userData);

export const logoutApi = async () => await api.post("/auth/logout");
