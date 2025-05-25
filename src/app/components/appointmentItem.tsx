"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "./button";
import { IAppointment } from "../lib/api";

interface AppointmentItemProps {
  appointment: IAppointment;
}

const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/appointments/${appointment._id}`);
  };

  return (
    <div className="p-4 border rounded shadow hover:shadow-md transition">
      <h2 className="text-lg font-bold">{appointment.businessName}</h2>
      <p className="text-sm text-gray-600">Date: {appointment.dateTime}</p>
      <p className="text-sm text-gray-600">Status: {appointment.status}</p>
      <Button onClick={handleViewClick} className="mt-3">
        Go to
      </Button>
    </div>
  );
};

export default AppointmentItem;
