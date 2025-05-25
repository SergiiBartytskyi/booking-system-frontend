"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api";

export const useAppointments = () =>
  useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
