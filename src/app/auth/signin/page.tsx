import LoginForm from "@/app/components/loginForm";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="py-6 px-10 flex flex-col gap-5">
      <p className="font-bold text-2xl">Login user</p>
      <LoginForm />

      <div className="bg-amber-300 p-3 w-fit rounded flex flex-col gap-3">
        <p className="font-bold">
          If you don&apos;t have an account, follow the link to sign up!
        </p>
        <Link
          href={"/auth/signup"}
          className="border rounded bg-blue-500 hover:bg-blue-300 p-2 w-50 flex justify-center items-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Page;
