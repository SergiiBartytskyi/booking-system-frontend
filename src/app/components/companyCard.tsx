"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "./button";
import { IBusinessUser } from "../lib/api";

interface CompanyCardProps {
  company: IBusinessUser;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/companies/${company.id}`);
  };

  return (
    <div className="p-4 border rounded shadow hover:shadow-md transition">
      <h2 className="text-lg font-bold">{company.name}</h2>
      <p className="text-sm text-gray-600">{company.email}</p>
      <Button onClick={handleViewClick} className="mt-3">
        Go to
      </Button>
    </div>
  );
};

export default CompanyCard;
