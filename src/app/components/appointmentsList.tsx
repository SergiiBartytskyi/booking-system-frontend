"use client";

import { IAppointment } from "../lib/api";
import { useAppointments } from "../lib/queries/useAppointments";
import AppointmentItem from "./appointmentItem";

const AppointmentList = () => {
  const { data: appointments, isLoading, error } = useAppointments();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {(error as Error).message}</p>;

  if (!appointments || appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <div className="flex items-center flex-wrap gap-4">
      {appointments.map((appointment: IAppointment) => (
        <AppointmentItem key={appointment._id} appointment={appointment} />
      ))}
    </div>
  );
};

export default AppointmentList;
