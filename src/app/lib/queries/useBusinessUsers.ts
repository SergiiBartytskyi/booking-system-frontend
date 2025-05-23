"use client";

import { useQuery } from "@tanstack/react-query";
import { getBusinessUsers } from "../api";

export const useBusinessUsers = () =>
  useQuery({
    queryKey: ["companies"],
    queryFn: getBusinessUsers,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
