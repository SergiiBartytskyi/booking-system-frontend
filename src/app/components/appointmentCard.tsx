"use client";

import { useQueryClient } from "@tanstack/react-query";
import { IApiResponse, Role } from "@/app/lib/api";
import AppointmentEditForm from "./appointmentEditForm";
import { formatDateTime } from "../lib/utils/formatDateTime";
import { useAppointment } from "../lib/queries";
interface AppointmentCardProps {
  id: string;
}
const AppointmentCard = ({ id }: AppointmentCardProps) => {
  const queryClient = useQueryClient();

  const { data: appointment, isLoading, error } = useAppointment(id);

  const response = queryClient.getQueryData(["currentUser"]) as IApiResponse;
  const userRole = response.data.role;

  if (isLoading) return <p>Loading...</p>;
  if (error || !appointment) return <p>Not found the appointment</p>;
  const date = formatDateTime(appointment.createdAt);

  return (
    <div className="p-6 flex flex-col gap-5">
      <h2>
        {userRole === Role.CLIENT ? "Company" : "Client"}:{" "}
        <span className="text-2xl font-bold">
          {userRole === Role.CLIENT
            ? appointment.businessName
            : appointment.clientName}
        </span>
      </h2>
      <p className="text-gray-600">Register: {date}</p>
      <AppointmentEditForm appointmentId={appointment._id} />
    </div>
  );
};

export default AppointmentCard;
