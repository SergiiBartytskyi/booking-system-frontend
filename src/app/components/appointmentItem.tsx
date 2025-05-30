"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "./button";
import { IApiResponse, IAppointment, Role, Status } from "../lib/api";
import { clsx } from "clsx";
import { formatDateTime } from "../lib/utils/formatDateTime";
import { useQueryClient } from "@tanstack/react-query";

interface AppointmentItemProps {
  appointment: IAppointment;
}

const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  const queryClient = useQueryClient();
  const response = queryClient.getQueryData(["currentUser"]) as IApiResponse;
  const userRole = response.data.role;

  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/appointments/${appointment._id}`);
  };

  const date = formatDateTime(appointment.dateTime);

  return (
    <div className="p-4 border rounded shadow hover:shadow-md transition w-100">
      <h2>
        {userRole === Role.CLIENT ? "Company" : "Client"}:{" "}
        <span className="text-lg font-bold">
          {userRole === Role.CLIENT
            ? appointment.businessName
            : appointment.clientName}
        </span>
      </h2>
      <p className="text-sm text-gray-600">Date: {date}</p>
      <p className="text-sm text-gray-600">
        Status:{" "}
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
      </p>
      <Button onClick={handleViewClick} className="mt-3">
        Go to
      </Button>
    </div>
  );
};

export default AppointmentItem;
