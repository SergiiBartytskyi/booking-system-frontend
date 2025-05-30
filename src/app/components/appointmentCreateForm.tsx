"use client";

import React from "react";
import { Form, Formik } from "formik";
import InputField from "./inputField";
import Button from "./button";

import { BarLoader } from "react-spinners";
import { useCreateAppointment } from "../lib/mutations";

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
  const { handleCreate, isPending } = useCreateAppointment();

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

        <Button type="submit" disabled={isPending}>
          {!isPending ? (
            "Add booking"
          ) : (
            <div className="flex items-center gap-1">
              <p>Booking </p>
              <BarLoader speedMultiplier={1} color="white" width={40} />
            </div>
          )}
        </Button>
      </Form>
    </Formik>
  );
};

export default AppointmentCreateForm;
