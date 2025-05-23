"use client";

import { useQuery } from "@tanstack/react-query";
import { getBusinessUser, refreshUser } from "../api";

export const useBusinessUser = (id: string) =>
  useQuery({
    queryKey: ["companies", id],
    queryFn: () => getBusinessUser(id),
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
