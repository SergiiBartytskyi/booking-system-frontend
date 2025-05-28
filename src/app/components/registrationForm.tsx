"use client";

import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { Role } from "../lib/api";
import InputField from "./inputField";
import Button from "./button";
import { useRegisterUser } from "../lib/mutations/useRegisterUser";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum.")
    .max(50, "Password is too long.")
    .required("Required"),
  name: Yup.string()
    .min(2, "Name is too short.")
    .max(20, "Name is too long.")
    .required("Required"),
  role: Yup.mixed<Role>().oneOf(Object.values(Role), "Invalid role"),
});

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
  const { handleSignup, isPending } = useRegisterUser();

  const handleSubmit = async (values: RegistrationFieldValues) => {
    handleSignup({
      ...values,
    });
  };

  const roleOptions = Object.values(Role) as Role[];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      <Form>
        <div className="flex flex-col gap-6 mb-5 w-md">
          <div>
            <InputField
              required
              placeholder="email@mail.com"
              name="email"
              label="Email"
              type="email"
              id="email"
            />
            <ErrorMessage
              className="text-red-500"
              name="email"
              component="span"
            />
          </div>

          <div>
            <InputField
              required
              placeholder="password"
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <ErrorMessage
              className="text-red-500"
              name="password"
              component="span"
            />
          </div>

          <div>
            <InputField
              required
              placeholder="name"
              name="name"
              label="Name"
              type="text"
              id="name"
            />
            <ErrorMessage
              className="text-red-500"
              name="name"
              component="span"
            />
          </div>

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

        <Button type="submit" disabled={isPending}>
          Register a new user
        </Button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
