"use client";

import { useQuery } from "@tanstack/react-query";
import { getBusinessUser } from "@/app/lib/api";

const CompanyCard = ({ id }: { id: string }) => {
  const {
    data: company,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies", id],
    queryFn: () => getBusinessUser(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !company) return <p>Not found the company</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
      <p className="text-gray-600 mb-2">{company.email}</p>
      <p className="text-gray-500">
        Register: {new Date(company.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CompanyCard;
