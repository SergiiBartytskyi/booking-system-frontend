import Profile from "@/app/components/profile";
import { IUser, refreshUser } from "@/app/lib/api";
import { useCurrentUser } from "@/app/lib/queries/useCurrentUser";
import getQueryClient from "@/app/lib/utils/getQueryClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

interface PageProps {}

const Page = async ({}: PageProps) => {
  // const queryClient = getQueryClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["currentUser"],
    queryFn: refreshUser,
    // staleTime: 10 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>My profile</div>
      <Profile />
    </HydrationBoundary>
  );
};

export default Page;
