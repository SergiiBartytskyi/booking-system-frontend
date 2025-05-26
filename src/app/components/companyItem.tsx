"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "./button";
import { IBusinessUser } from "../lib/api";

interface CompanyItemProps {
  company: IBusinessUser;
}

const CompanyItem = ({ company }: CompanyItemProps) => {
  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/companies/${company._id}`);
  };

  return (
    <li className="p-4 border rounded shadow hover:shadow-md transition flex flex-col w-100 h-40 justify-between">
      <h2 className="text-lg font-bold">{company.name}</h2>
      <p className="text-sm text-gray-600">{company.email}</p>
      <Button onClick={handleViewClick} className="mt-3">
        Go to
      </Button>
    </li>
  );
};

export default CompanyItem;
