"use client";

import React from "react";
import { Form, Formik } from "formik";
import { loginUser } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "./inputField";
import Button from "./button";
import { useRouter } from "next/navigation";

export type LoginFieldValues = {
  email: string;
  password: string;
};

const initialValues: LoginFieldValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.replace("/appointments");
    },
  });

  const handleSubmit = async (values: LoginFieldValues) => {
    mutate({
      ...values,
    });
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <p>Login user</p>
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
