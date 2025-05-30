"use client";

import { useBusinessUser } from "../lib/queries";
import AppointmentCreateForm from "./appointmentCreateForm";

const CompanyCard = ({ id }: { id: string }) => {
  const { data: company, isLoading, error } = useBusinessUser(id);

  if (isLoading) return <p>Loading...</p>;
  if (error || !company) return <p>Not found the company</p>;

  return (
    <div className="p-6 flex flex-col gap-5">
      <h2 className="text-2xl font-bold">{company.name}</h2>
      <p className="text-gray-600">{company.email}</p>
      <p className="text-gray-600">
        Register: {new Date(company.createdAt).toLocaleDateString()}
      </p>
      <AppointmentCreateForm businessId={id} businessName={company.name} />
    </div>
  );
};

export default CompanyCard;
