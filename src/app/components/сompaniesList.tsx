"use client";

import { useQuery } from "@tanstack/react-query";
import { getBusinessUsers, IBusinessUser } from "@/app/lib/api";
import CompanyCard from "./companyCard";
import { useBusinessUsers } from "../lib/queries/useBusinessUsers";

const CompaniesList = () => {
  const { data: companies, isLoading, error } = useBusinessUsers();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {(error as Error).message}</p>;

  if (!companies || companies.length === 0) {
    return <p>No companies found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {companies.map((company: IBusinessUser) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  );
};

export default CompaniesList;
