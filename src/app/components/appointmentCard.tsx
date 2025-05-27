"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAppointmentById, IApiResponse, Role } from "@/app/lib/api";
import AppointmentEditForm from "./appointmentEditForm";
import { formatDateTime } from "../lib/utils/formatDateTime";

interface AppointmentCardProps {
  id: string;
}
const AppointmentCard = ({ id }: AppointmentCardProps) => {
  const queryClient = useQueryClient();
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

  const response = queryClient.getQueryData(["currentUser"]) as IApiResponse;
  const userRole = response.data.role;

  if (isLoading) return <p>Loading...</p>;
  if (error || !appointment) return <p>Not found the appointment</p>;
  const date = formatDateTime(appointment.createdAt);
  return (
    <div className="p-6 flex flex-col gap-5">
      <h2 className="text-2xl font-bold">
        {userRole === Role.CLIENT
          ? appointment.businessName
          : appointment.clientName}
      </h2>
      <p className="text-gray-600">Register: {date}</p>
      <AppointmentEditForm appointmentId={appointment._id} />
    </div>
  );
};

export default AppointmentCard;
