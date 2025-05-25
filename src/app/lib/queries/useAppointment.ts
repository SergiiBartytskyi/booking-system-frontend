"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "../api";

export const useAppointment = (id: string) =>
  useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentById(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
