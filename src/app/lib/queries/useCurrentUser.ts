"use client";

import { useQuery } from "@tanstack/react-query";
import { refreshUser } from "../api";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: refreshUser,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
