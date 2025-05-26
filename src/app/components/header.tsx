"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, User } from "lucide-react";
import { useCurrentUser } from "../lib/queries/useCurrentUser";
import Button from "./button";
import { useEditUser } from "../lib/mutations/useEditUser";
import EditUserFormModal from "./editUserFormModal";

export interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const { data: user } = useCurrentUser();
  const { handleEdit, isPending } = useEditUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <header className="flex items-center gap-5 py-6	px-10 border-b border-gray-300 h-20">
      <h1 className="flex-1 text-3xl font-semibold text-gray-900">
        Booking system
      </h1>
      <div className="w-px self-stretch bg-gray-300" />
      <div className="flex gap-3 items-center">
        <User size={44} />
        <div>
          <p className="text-base	font-semibold text-gray-900">
            {user?.data.name}
          </p>
          <p className="text-sm	font-light text-gray-900">{user?.data.email}</p>
        </div>
        <Button type="button" variant="outline" onClick={handleClick}>
          <Pencil size={12} />
        </Button>
      </div>
      {isModalOpen && (
        <EditUserFormModal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
