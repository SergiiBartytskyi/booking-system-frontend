import CompaniesList from "@/app/components/сompaniesList";
import { getBusinessUsers } from "@/app/lib/api";
import getQueryClient from "@/app/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companies"],
    queryFn: getBusinessUsers,
    staleTime: 10 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CompaniesList />
    </HydrationBoundary>
  );
};

export default Page;
