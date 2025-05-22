"use client";

import React from "react";
import Image from "next/image";
import SidebarItem from "./sidebarItem";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../lib/api";
import getQueryClient from "../lib/utils/getQueryClient";

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const queryClient = getQueryClient();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
  const handleExitClick = () => {
    mutate();
    router.push("/");
  };

  return (
    <aside className="fixed top-20 left-0 z-40 w-60 h-[calc(100vh-5rem)]">
      <div className="flex flex-col h-full overflow-y-auto bg-gray-900 pt-20">
        <ul className="space-y-7">
          <SidebarItem
            current={pathname === "/companies"}
            pathname="/companies"
            src="/icons/briefcase.svg"
            alt="companies icon"
          >
            Companies
          </SidebarItem>
          <SidebarItem
            current={pathname === "/profile"}
            pathname="/profile"
            src="/icons/squares.svg"
            alt="profile icon"
          >
            My profile
          </SidebarItem>
        </ul>
        <button
          className="flex items-center gap-2 p-6 mt-auto mx-auto"
          onClick={handleExitClick}
        >
          <Image
            width={18}
            height={18}
            src="/icons/arrow-left-on-rectangle.svg"
            alt="exit icon"
          />
          <span className="font-medium text-white">Exit</span>
        </button>
      </div>
    </aside>
  );
}
