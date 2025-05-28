"use client";

import React from "react";
import { Form, Formik } from "formik";
import { Role } from "../lib/api";
import InputField from "./inputField";
import Button from "./button";
import { useRegisterUser } from "../lib/mutations/useRegisterUser";

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

const RegistrationForm = () => {
  const { handleSignup, isPending, error } = useRegisterUser();

  const handleSubmit = async (values: RegistrationFieldValues) => {
    handleSignup({
      ...values,
    });
  };

  const roleOptions = Object.values(Role) as Role[];
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div className="flex flex-col gap-6 mb-5 w-md">
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
            label="Name"
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
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </InputField>
        </div>

        {error && <p className="text-red-500">{(error as Error).message}</p>}

        <Button type="submit" disabled={isPending}>
          Register a new user
        </Button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
