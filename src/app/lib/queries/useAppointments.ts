"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api";

export const useAppointments = () =>
  useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    staleTime: 1 * 60 * 10000,
    gcTime: 5 * 60 * 1000,
    retry: false,
  });
