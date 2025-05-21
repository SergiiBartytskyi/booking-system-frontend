"use client";

import React from "react";
import { Form, Formik } from "formik";
import { registerUser, Role } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "./input-field";
import Button from "./button";

export type RegistrationFieldValues = {
  email: string;
  password: string;
  name: string;
  role: Role;
};

const initialValues: RegistrationFieldValues = {
  email: "",
  password: "",
  name: "",
  role: Role.CLIENT,
};

export interface RegistrationFormProps {
  onSubmit?: (values: RegistrationFieldValues) => void | Promise<void>;
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const handleSubmit = async (values: RegistrationFieldValues) => {
    mutate({
      ...values,
    });
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <p>Registration</p>
        <div className="flex gap-6">
          <InputField
            required
            placeholder="email@mail.com"
            name="email"
            label="Email"
            type="email"
            id="email"
          />
          <InputField
            required
            placeholder="password"
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <InputField
            required
            placeholder="name"
            name="name"
            label="name"
            type="text"
            id="name"
          />
          <InputField
            required
            label="Role"
            placeholder="role"
            name="role"
            as="select"
          >
            {(Object.values(Role) as Role[]).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </InputField>
        </div>
        <Button type="submit" disabled={isPending}>
          Register a new user
        </Button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
