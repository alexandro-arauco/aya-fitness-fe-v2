"use client";

import { Avatar } from "@/components/ui/avatar";
import useGetFromQuery from "@/hooks/useGetFromQuery";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getInitials } from "@/utils/dashboard/commons";

export default function UserAvatar() {
  const { getItem, isClient } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  return (
    <Avatar className="bg-gray-300 flex items-center justify-center w-15 h-15 font-bold text-2xl tracking-widest">
      {isClient && information
        ? getInitials(`${information.first_name} ${information.last_name}`)
        : ""}
    </Avatar>
  );
}
