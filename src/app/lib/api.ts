import axios from "axios";
import { RegistrationFieldValues } from "../components/registrationForm";
import { LoginFieldValues } from "../components/loginForm";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface IApiResponse {
  data: IUser;
  message: string;
  status: number;
}

export interface IBusinessUser {
  _id: string;
  name: string;
  email: string;
  role: Role.BUSINESS;
}

export interface IAppointment {
  _id: string;
  clientId: string;
  clientName: string;
  businessId: string;
  businessName: string;
  dateTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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

// Auth
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

// Users
export const getBusinessUsers = async () => {
  const res = await api.get("/users/business");
  return res.data.data;
};

export const getBusinessUser = async (id: string) => {
  const res = await api.get(`/users/business/${id}`);
  return res.data.data;
};

export const editCurrentUser = async ({
  id,
  name,
  role,
}: {
  id: string;
  name: string;
  role: Role;
}) => {
  const res = await api.put(`/users/${id}`, { name, role });
  return res.data.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data.data;
};

// Appointment
export const getAppointments = async () => {
  const res = await api.get(`/appointments/me`);
  return res.data.data;
};

export const getAppointmentById = async (id: string) => {
  const res = await api.get(`/appointments/${id}`);
  return res.data.data;
};

export const addAppointment = async ({
  businessId,
  businessName,
  dateTime,
}: {
  businessId: string;
  businessName: string;
  dateTime: string;
}) => {
  const res = await api.post(`/appointments`, {
    businessId,
    businessName,
    dateTime,
  });
  return res.data.data;
};

export const editAppointment = async ({
  appointmentId,
  status,
  dateTime,
}: {
  appointmentId: string;
  status: Status;
  dateTime: string;
}) => {
  const res = await api.patch(`/appointments/${appointmentId}`, {
    status,
    dateTime,
  });
  return res.data.data;
};

export const deleteAppointment = async (appointmentId: string) => {
  const res = await api.delete(`/appointments/${appointmentId}`);
  return res.data.data;
};
