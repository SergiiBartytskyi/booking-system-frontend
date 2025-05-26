"use client";

import React from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  variant?: ButtonVariant;
}

export default function Button({
  disabled,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "py-2.5 px-5 text-base text-center font-medium rounded transition-colors duration-200",
        {
          primary: "bg-gray-900 text-zinc-50",
          secondary: "bg-gray-300 text-gray-900",
          outline: "border border-gray-900 text-gray-900 bg-transparent",
          danger: "bg-red-500 text-white",
        }[variant],
        !disabled &&
          {
            primary: "hover:bg-gray-500 hover:text-gray-900 active:bg-gray-950",
            secondary: "hover:bg-gray-500 active:bg-gray-300",
            outline: "hover:bg-gray-900 hover:text-white",
            danger: "hover:bg-red-700 active:bg-red-800",
          }[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  );
}
