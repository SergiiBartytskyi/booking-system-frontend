import AppointmentCard from "@/app/components/appointmentCard";
import { getAppointmentById } from "@/app/lib/api";
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
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-md mt-6">
        <AppointmentCard id={id} />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
