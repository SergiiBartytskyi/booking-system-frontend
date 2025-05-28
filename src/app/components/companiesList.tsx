"use client";

import { IBusinessUser } from "@/app/lib/api";
import CompanyItem from "./companyItem";
import { useBusinessUsers } from "../lib/queries/useBusinessUsers";
import { AxiosError } from "axios";
import Link from "next/link";

const CompaniesList = () => {
  const { data: companies, isLoading, isError, error } = useBusinessUsers();

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      return (
        <div className="flex flex-col gap-5">
          <p className="text-red-500">
            Access denied. You do not have permission to access this resource.
          </p>
          <Link
            href={"/appointments"}
            className="border rounded p-3 w-50 bg-blue-500 hover:bg-blue-300"
          >
            To My Appointments
          </Link>
        </div>
      );
    }

    return <p>Error: {error.message}</p>;
  }

  if (!companies || companies.length === 0) {
    return <p>No companies found.</p>;
  }

  return (
    <ul className="flex flex-wrap gap-5">
      {companies.map((company: IBusinessUser) => (
        <CompanyItem key={company._id} company={company} />
      ))}
    </ul>
  );
};

export default CompaniesList;
