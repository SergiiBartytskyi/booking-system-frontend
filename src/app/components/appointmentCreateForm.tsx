"use client";

import React from "react";
import { Form, Formik } from "formik";
import InputField from "./inputField";
import Button from "./button";
import { useCreateAppointment } from "../lib/mutations/useCreateAppointment";

export type AppointmentFieldValues = {
  businessId?: string;
  dateTime: string;
};

export interface AppointmentFormProps {
  businessId: string;
  businessName: string;
}

const AppointmentCreateForm = ({
  businessId,
  businessName,
}: AppointmentFormProps) => {
  const { handleCreate, isPending, error } = useCreateAppointment();

  const handleSubmit = (values: AppointmentFieldValues) => {
    handleCreate({ ...values, businessId, businessName });
  };

  return (
    <Formik initialValues={{ dateTime: "" }} onSubmit={handleSubmit}>
      <Form>
        <div className="flex gap-6 mb-5">
          <InputField
            required
            name="dateTime"
            label="Choose a date and time to appointment"
            type="datetime-local"
            id="dateTime"
          />
        </div>

        {error && <p className="text-red-500">{(error as Error).message}</p>}

        <Button type="submit" disabled={isPending}>
          Register
        </Button>
      </Form>
    </Formik>
  );
};

export default AppointmentCreateForm;
