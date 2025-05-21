"use client";

import React from "react";

import { User } from "lucide-react";
import { useCurrentUser } from "../lib/queries/useCurrentUser";

export interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const { data } = useCurrentUser();
  console.log("data :>> ", data);

  return (
    <header className="flex items-center gap-5 py-6	px-10 border-b border-gray-300 h-20">
      <h1 className="flex-1 text-3xl font-semibold text-gray-900">
        Booking system
      </h1>
      <div className="w-px self-stretch bg-gray-300" />
      <div className="flex gap-3">
        <User size={44} />
        <div>
          {/* <p className="text-base	font-semibold text-gray-900">{user?.name}</p>
          <p className="text-sm	font-light text-gray-900">{user?.email}</p> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
