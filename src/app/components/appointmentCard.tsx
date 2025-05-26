"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAppointmentById,
  getBusinessUser,
  IAppointment,
  Status,
} from "@/app/lib/api";
import AppointmentForm from "./appointmentCreateForm";
import clsx from "clsx";
import AppointmentEditForm from "./appointmentEditForm";
import { formatDateTime } from "../lib/utils/formatDateTime";

interface AppointmentCardProps {
  id: string;
}
const AppointmentCard = ({ id }: AppointmentCardProps) => {
  const {
    data: appointment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentById(id),
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !appointment) return <p>Not found the appointment</p>;
  const date = formatDateTime(appointment.createdAt);
  return (
    <div className="p-6 flex flex-col gap-5">
      <h2 className="text-2xl font-bold">{appointment.businessName}</h2>
      <p className="text-gray-600">Register: {date}</p>
      <AppointmentEditForm appointmentId={appointment._id} />
    </div>
  );
};

export default AppointmentCard;
