import RegistrationForm from "@/app/components/registrationForm";
import React from "react";

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <div className="py-6 px-10">
      <RegistrationForm />
    </div>
  );
};

export default Page;
