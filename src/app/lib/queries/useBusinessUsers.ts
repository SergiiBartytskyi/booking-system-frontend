"use client";

import { useQuery } from "@tanstack/react-query";
import { refreshUser } from "../api";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: refreshUser,
  });
