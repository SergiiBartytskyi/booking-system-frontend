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

  console.log("appointment :>> ", appointment);

  if (isLoading) return <p>Loading...</p>;
  if (error || !appointment) return <p>Not found the company</p>;

  return (
    <div className="p-6  ">
      <h2 className="text-xl font-bold mb-2">{appointment.businessName}</h2>
      <p className="text-gray-500 mb-4">
        Register: {new Date(appointment.createdAt).toLocaleDateString()}
      </p>
      {/* <p className="font-medium mb-4">
        Meeting status:{" "}
        <span
          className={clsx(
            "font-bold",
            appointment.status === Status.SCHEDULED && "text-blue-700",
            appointment.status === Status.CANCELLED && "text-red-700",
            appointment.status === Status.COMPLETED && "text-green-700"
          )}
        >
          {appointment.status}
        </span>
      </p> */}

      <AppointmentEditForm appointmentId={appointment._id} />
      <div className="flex gap-3">
        {/* <Button variant="destructive" onClick={onDelete}>
          Видалити
        </Button>
        <Button onClick={onSave}>Зберегти</Button> */}
      </div>
    </div>
  );
};

export default AppointmentCard;
