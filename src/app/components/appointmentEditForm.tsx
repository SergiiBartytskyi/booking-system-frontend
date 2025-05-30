"use client";

import React from "react";
import { Form, Formik } from "formik";
import { IApiResponse, IAppointment, Role, Status } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "./inputField";
import Button from "./button";
import clsx from "clsx";
import { formatDateTime } from "../lib/utils/formatDateTime";
import { useDeleteAppointment, useEditAppointment } from "../lib/mutations";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

export type AppointmentFieldValues = {
  status: Status;
  dateTime: string;
};

export interface AppointmentFormProps {
  appointmentId: string;
}

const AppointmentEditForm = ({ appointmentId }: AppointmentFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleDelete, isDeletePending } = useDeleteAppointment();
  const { handleEdit, isEditAppointmentPending } = useEditAppointment();
  const response = queryClient.getQueryData(["currentUser"]) as IApiResponse;
  const userRole = response.data.role;

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
  const handleBackClick = () => {
    router.back();
  };
  const statusOptions = Object.values(Status) as Status[];

  return (
    <Formik
      initialValues={{ dateTime: initialDateTime, status: initialStatus }}
      onSubmit={handleSubmit}
    >
      <Form>
        <div
          className={
            userRole === Role.CLIENT
              ? "flex gap-6 mb-5"
              : "flex flex-col gap-6 mb-5"
          }
        >
          {userRole === Role.CLIENT ? (
            <InputField
              required
              name="dateTime"
              label="Choose date & time"
              type="datetime-local"
            />
          ) : (
            <p>
              The meeting is scheduled for
              <span className="font-bold ml-5">
                {formatDateTime(initialDateTime)}
              </span>
            </p>
          )}

          {userRole === Role.CLIENT ? (
            <InputField required label="Status" name="status" as="select">
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </InputField>
          ) : (
            <p className="text-sm text-gray-600 block">
              Status:{" "}
              <span
                className={clsx(
                  "font-bold",
                  initialStatus === Status.SCHEDULED && "text-blue-700",
                  initialStatus === Status.CANCELLED && "text-red-700",
                  initialStatus === Status.COMPLETED && "text-green-700"
                )}
              >
                {initialStatus}
              </span>
            </p>
          )}
        </div>

        <div className="flex gap-5 justify-between items-center">
          {userRole === Role.CLIENT && (
            <Button
              type="submit"
              variant="primary"
              disabled={isEditAppointmentPending}
            >
              {!isEditAppointmentPending ? (
                "Save"
              ) : (
                <div className="flex items-center gap-1">
                  <p>Saving </p>
                  <BarLoader speedMultiplier={1} color="white" width={40} />
                </div>
              )}
            </Button>
          )}

          {userRole === Role.BUSINESS && (
            <Button
              type="button"
              variant="danger"
              onClick={() => handleDelete(appointmentId)}
              disabled={isDeletePending}
            >
              {!isDeletePending ? (
                "Delete"
              ) : (
                <div className="flex items-center gap-1">
                  <p>Deleting </p>
                  <BarLoader speedMultiplier={1} color="white" width={40} />
                </div>
              )}
            </Button>
          )}

          <Button type="button" variant="secondary" onClick={handleBackClick}>
            Cancel
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default AppointmentEditForm;
