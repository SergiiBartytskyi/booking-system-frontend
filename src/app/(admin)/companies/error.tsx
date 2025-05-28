"use client";

import React from "react";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="p-5 bg-red-100 text-red-800 rounded">
      <p>{`Something went wrong: ${error.message}`}</p>
      <Button onClick={() => reset()}>Try again</Button>
      <Button
        onClick={() => {
          reset();
          router.push("/appointments");
        }}
        className="ml-3"
      >
        Go to My Appointments
      </Button>
    </div>
  );
}
