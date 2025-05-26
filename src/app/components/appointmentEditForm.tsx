"use client";

import React from "react";
import { Form, Formik } from "formik";
import {
  addAppointment,
  editAppointment,
  IAppointment,
  Status,
} from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "./inputField";
import Button from "./button";
import { useRouter } from "next/navigation";
import { useDeleteAppointment } from "../lib/mutations/useDeleteAppointment";
import { useEditAppointment } from "../lib/mutations/useEditAppointment";

export type AppointmentFieldValues = {
  status: Status;
  dateTime: string;
};

export interface AppointmentFormProps {
  appointmentId: string;
}

const AppointmentEditForm = ({ appointmentId }: AppointmentFormProps) => {
  const queryClient = useQueryClient();
  const { handleDelete } = useDeleteAppointment();
  const { handleEdit, isPending, isSuccess, error } = useEditAppointment();

  const appointment = queryClient.getQueryData<IAppointment>([
    "appointments",
    appointmentId,
  ]);

  const initialDateTime = appointment ? appointment.dateTime.slice(0, 16) : "";
  const initialStatus = appointment
    ? (appointment.status as Status)
    : Status.SCHEDULED;

  const handleSubmit = (values: AppointmentFieldValues) => {
    handleEdit({ appointmentId, ...values });
  };

  const statusOptions = Object.values(Status) as Status[];

  return (
    <Formik
      initialValues={{ dateTime: initialDateTime, status: initialStatus }}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="flex gap-6 mb-5">
          <InputField
            required
            name="dateTime"
            label="Choose date & time"
            type="datetime-local"
          />

          <InputField required label="Status" name="status" as="select">
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </InputField>
        </div>

        {error && <p className="text-red-500">{(error as Error).message}</p>}

        <div className="flex gap-5 justify-between items-center">
          <Button type="submit" variant="secondary" disabled={isPending}>
            Booking
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => handleDelete(appointmentId)}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default AppointmentEditForm;
