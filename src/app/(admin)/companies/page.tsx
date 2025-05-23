import CompaniesList from "@/app/components/сompaniesList";
import { getBusinessUsers, IBusinessUser } from "@/app/lib/api";
import getQueryClient from "@/app/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companies"],
    queryFn: getBusinessUsers,
  });

  // const companies = queryClient.getQueryData(["companies"]) as IBusinessUser[];
  // console.log("companies :>> ", companies);
  // if (!companies || companies.length === 0) {
  //   // notFound();
  //   return <p>No companies found</p>;
  // }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CompaniesList />
    </HydrationBoundary>
  );
};

export default Page;
