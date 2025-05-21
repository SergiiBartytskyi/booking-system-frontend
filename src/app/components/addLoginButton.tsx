"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button";

const AddLoginButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/auth/signin", { scroll: false })}>
      Log in
    </Button>
  );
};

export default AddLoginButton;
