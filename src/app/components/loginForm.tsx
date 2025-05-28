"use client";

import React from "react";
import { Form, Formik } from "formik";
import InputField from "./inputField";
import Button from "./button";
import { useLoginUser } from "../lib/mutations/useLoginUser";

export type LoginFieldValues = {
  email: string;
  password: string;
};

const initialValues: LoginFieldValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { handleLogin, isPending, error } = useLoginUser();

  const handleSubmit = async (values: LoginFieldValues) => {
    handleLogin({
      ...values,
    });
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div className="flex gap-6 mb-5">
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
        </div>

        {error && <p className="text-red-500">{(error as Error).message}</p>}

        <Button type="submit" disabled={isPending}>
          Log in
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
