"use client";

import React from "react";
import { Form, Formik } from "formik";
import { addAppointment, loginUser, Role, Status } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "./inputField";
import Button from "./button";
import { useRouter } from "next/navigation";

export type AppointmentFieldValues = {
  businessId?: string;
  dateTime: string;
};

export interface AppointmentFormProps {
  businessId: string;
}

const AppointmentForm = ({ businessId }: AppointmentFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ dateTime }: AppointmentFieldValues) =>
      addAppointment({ businessId, dateTime }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.replace("/profile");
    },
  });

  const handleSubmit = (values: AppointmentFieldValues) => {
    mutate({ ...values, businessId });
  };

  return (
    <Formik
      initialValues={{ dateTime: "" }}
      onSubmit={(values) => mutate(values)}
    >
      <Form>
        <div className="flex gap-6 mb-5">
          <InputField
            required
            name="dateTime"
            label="Choose a date and time to register"
            type="datetime-local"
            id="dateTime"
          />
        </div>

        {error && <p className="text-red-500">{(error as Error).message}</p>}

        <Button type="submit" disabled={isPending}>
          Booking
        </Button>
      </Form>
    </Formik>
  );
};

export default AppointmentForm;
