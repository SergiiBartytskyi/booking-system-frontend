"use client";

import { useQuery } from "@tanstack/react-query";
import { getBusinessUser } from "../api";

export const useBusinessUser = (id: string) =>
  useQuery({
    queryKey: ["companies", id],
    queryFn: () => getBusinessUser(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
