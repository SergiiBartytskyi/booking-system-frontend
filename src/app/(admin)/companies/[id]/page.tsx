import UserCard from "@/app/components/companyCard";
import { IBusinessUser } from "@/app/lib/api";
import getQueryClient from "@/app/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companies", id],
    queryFn: () => getUserById(id, { cache: "no-store" }),
    staleTime: 10 * 1000,
  });

  const company = queryClient.getQueryData(["companies", id]) as IBusinessUser;
  if (!company) {
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex gap-5">
        <UserCard id="id" />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
