import LoginForm from "@/app/components/loginForm";
import RegistrationForm from "@/app/components/registrationForm";
import React from "react";

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <div className="py-6 px-10">
      <LoginForm />
    </div>
  );
};

export default Page;
