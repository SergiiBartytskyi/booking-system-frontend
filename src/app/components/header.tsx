"use client";

import React, { useState } from "react";
import { Pencil, User } from "lucide-react";
import Button from "./button";
import EditUserFormModal from "./editUserFormModal";
import { useCurrentUser } from "../lib/queries";

const Header = () => {
  const { data: user } = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <header className="flex items-center gap-5 py-6	px-10 border-b border-gray-300 h-20 fixed top-0 left-0 w-full z-100 bg-blue-200">
      <h1 className="flex-1 text-3xl font-semibold text-gray-900">
        Booking system
      </h1>
      <div className="w-px self-stretch bg-gray-600" />
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
