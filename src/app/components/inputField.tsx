"use client";

import React from "react";
import { Field } from "formik";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  as?: "input" | "select";
  children?: React.ReactNode;
}

export default function InputField({
  label,
  name,
  id,
  as = "input",
  children,
  ...rest
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id || name} className="mb-2 text-base color-gray-900">
          {label}
        </label>
      )}

      {as === "select" ? (
        <Field
          as="select"
          id={id || name}
          name={name}
          {...rest}
          className="p-3 h-11 text-sm rounded border border-gray-300 shadow"
        >
          {children}
        </Field>
      ) : (
        <Field
          as="input"
          id={id || name}
          name={name}
          {...rest}
          className="p-3 h-11 text-sm rounded border border-gray-300 shadow"
        />
      )}
    </div>
  );
}
