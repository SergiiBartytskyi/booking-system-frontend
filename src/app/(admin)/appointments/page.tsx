import AppointmentList from "@/app/components/appointmentsList";
import { getAppointments, refreshUser } from "@/app/lib/api";
import getQueryClient from "@/app/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <h2 className="font-bold">My appointments</h2>
      <AppointmentList />
    </HydrationBoundary>
  );
};

export default Page;
