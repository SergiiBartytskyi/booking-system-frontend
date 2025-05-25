"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAppointmentById,
  getBusinessUser,
  IAppointment,
} from "@/app/lib/api";
import AppointmentForm from "./appointmentForm";

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
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !appointment) return <p>Not found the company</p>;

  return (
    <div className="border p-6 rounded-2xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">{appointment.businessName}</h2>
      <p className="text-gray-600">Email: {appointment.email}</p>
      <p className="text-gray-500 mb-4">
        Зареєстрована:{" "}
        {new Date(appointment.companyCreatedAt).toLocaleDateString()}
      </p>
      <p className="text-blue-700 font-medium mb-4">
        Статус зустрічі: {status}
      </p>
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
