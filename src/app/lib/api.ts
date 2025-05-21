import axios from "axios";
import { RegistrationFieldValues } from "../components/registrationForm";
import { LoginFieldValues } from "../components/loginForm";
const token = localStorage.getItem("accessToken");
export const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export interface IBusinessUser {
  id: string;
  name: string;
  email: string;
  role: Role.BUSINESS;
}

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

export const loginUser = async (userData: LoginFieldValues) => {
  (await api.post("/auth/signin", userData)).data;
};

export const refreshUser = async () => (await api.get("/users/me")).data;

export const logoutApi = async () => await api.post("/auth/logout");
