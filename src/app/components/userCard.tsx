"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Button from "./button";

interface UserCardProps {
  id: string;
}

const UserCard = ({ id }: UserCardProps) => {
  // const { data: user } = useQuery({
  //   queryKey: ["users", id],
  //   queryFn: () => getCompany(id),
  //   staleTime: 10 * 1000,
  // });

  // if (!user) return null;

  return (
    <div className="flex flex-col gap-3">
      <p>User Name</p>
      <p>User email</p>
      <p>Appointments date</p>
      <Button>Go on!</Button>
    </div>
  );
};

export default UserCard;
