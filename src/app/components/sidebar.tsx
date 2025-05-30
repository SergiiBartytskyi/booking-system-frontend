"use client";

import React from "react";
import Image from "next/image";
import SidebarItem from "./sidebarItem";
import { usePathname, useRouter } from "next/navigation";
import Button from "./button";
import { BarLoader } from "react-spinners";
import { useLogoutUser } from "../lib/mutations";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { handleLogout, isLogoutPending } = useLogoutUser();

  const handleExitClick = () => {
    handleLogout();
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
            current={pathname === "/appointments"}
            pathname="/appointments"
            src="/icons/squares.svg"
            alt="appointments icon"
          >
            Appointments
          </SidebarItem>
        </ul>

        <Button
          type="submit"
          onClick={handleExitClick}
          disabled={isLogoutPending}
          className="flex items-center gap-2 p-6 mt-auto mx-auto cursor-pointer "
        >
          {!isLogoutPending ? (
            <div className="flex items-center gap-1">
              <Image
                width={18}
                height={18}
                src="/icons/arrow-left-on-rectangle.svg"
                alt="exit icon"
              />
              <span className="font-medium text-white"> Exit</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <p className="font-medium text-white">Exiting </p>
              <BarLoader speedMultiplier={1} color="white" width={40} />
            </div>
          )}
        </Button>
      </div>
    </aside>
  );
}
