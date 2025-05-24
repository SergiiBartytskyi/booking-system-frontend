"use client";

import { useQuery } from "@tanstack/react-query";
import { refreshUser } from "../api";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: refreshUser,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
