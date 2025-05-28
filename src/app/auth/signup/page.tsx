import RegistrationForm from "@/app/components/registrationForm";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="py-6 px-10 flex flex-col gap-5">
      <p className="font-bold text-2xl">Registration</p>
      <RegistrationForm />

      <div className="bg-amber-300 p-3 w-fit rounded flex flex-col gap-3">
        <p className="font-bold">
          If you have an account, follow the link to log in!
        </p>
        <Link
          href={"/auth/signin"}
          className="border rounded bg-blue-500 hover:bg-blue-300 p-2 w-50 flex justify-center items-center"
        >
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default Page;
