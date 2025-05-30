"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api";

export const useAppointments = () =>
  useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
