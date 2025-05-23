import AppointmentForm from "@/app/components/appointmentForm";
import CompanyCard from "@/app/components/companyCard";
import { getBusinessUser } from "@/app/lib/api";
import getQueryClient from "@/app/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companies", id],
    queryFn: () => getBusinessUser(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-md mt-6">
        <CompanyCard id={id} />

        <div className="mt-6">
          <AppointmentForm businessId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
