"use client";

import React from "react";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";

export interface ErrorComponentProps {
  error: Error;
}

export default function ErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();
  console.log("error :>> ", error);
  return (
    <div>
      <p>{`Something went wrong. ${error.message}`}</p>
      <Button onClick={() => router.replace("/appointments")}>
        Go to my appointments
      </Button>
    </div>
  );
}
