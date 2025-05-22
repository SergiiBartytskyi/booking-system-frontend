import axios from "axios";
import { RegistrationFieldValues } from "../components/registrationForm";
import { LoginFieldValues } from "../components/loginForm";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

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
  return (await api.post("/auth/signin", userData)).data;
};

export const refreshUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const logout = async () => await api.post("/auth/logout");

export const getBusinessUsers = async (): Promise<IBusinessUser[]> => {
  const res = await api.get("/users/business");
  return res.data.data;
};
