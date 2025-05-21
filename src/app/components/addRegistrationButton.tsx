"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button";

const AddRegistrationButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/auth/signup", { scroll: false })}>
      Register
    </Button>
  );
};

export default AddRegistrationButton;
