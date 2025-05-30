"use client";

import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import InputField from "./inputField";
import Button from "./button";
import * as Yup from "yup";
import { BarLoader } from "react-spinners";
import { useLoginUser } from "../lib/mutations";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum.")
    .max(50, "Password is too long.")
    .required("Required"),
});

export type LoginFieldValues = {
  email: string;
  password: string;
};

const initialValues: LoginFieldValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { handleLogin, isPending } = useLoginUser();

  const handleSubmit = async (values: LoginFieldValues) => {
    handleLogin({
      ...values,
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SigninSchema}
    >
      <Form>
        <div className="flex gap-6 mb-5">
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
        </div>

        <Button type="submit" disabled={isPending}>
          {!isPending ? (
            "Log in"
          ) : (
            <div className="flex items-center gap-1">
              <p>Logging in </p>
              <BarLoader speedMultiplier={1} color="white" width={40} />
            </div>
          )}
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
