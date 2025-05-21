"use client";

import React, { use } from "react";
import { Form, Formik } from "formik";
import { loginUser, registerUser, Role } from "../lib/api";
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

export interface LoginFormProps {
  onSubmit?: (values: LoginFieldValues) => void | Promise<void>;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.data.accessToken);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.replace("/profile");
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
        </div>
        <Button type="submit" disabled={isPending}>
          Log in
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
