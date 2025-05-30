"use client";

import React, { useState } from "react";
import { Field } from "formik";
import { Eye, EyeOff } from "lucide-react";

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
  type = "text",
  children,
  ...rest
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name;

  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={inputId} className="mb-2 text-base color-gray-900">
          {label}
        </label>
      )}

      {as === "select" ? (
        <Field
          as="select"
          id={inputId}
          name={name}
          {...rest}
          className="p-3 h-11 text-sm rounded border border-gray-300 shadow"
        >
          {children}
        </Field>
      ) : (
        <div className="relative">
          <Field
            as="input"
            id={inputId}
            name={name}
            type={inputType}
            {...rest}
            className="px-3 h-11 text-sm rounded border border-gray-300 shadow-sm w-full"
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[50%] transform -translate-y-1/2 text-sm text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
