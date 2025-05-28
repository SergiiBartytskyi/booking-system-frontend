import CompaniesList from "@/app/components/companiesList";
import { getBusinessUsers } from "@/app/lib/api";
import getQueryClient from "@/app/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["companies"],
      queryFn: getBusinessUsers,
      staleTime: 1 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    });
  } catch (error) {
    throw error;
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <h2 className="font-bold">Business clients</h2>
      <CompaniesList />
    </HydrationBoundary>
  );
};

export default Page;
