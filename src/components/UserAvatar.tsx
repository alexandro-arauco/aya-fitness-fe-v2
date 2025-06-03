"use client";

import { Avatar } from "@/components/ui/avatar";
import useGetFromQuery from "@/hooks/useGetFromQuery";

export default function UserAvatar() {
  const { information } = useGetFromQuery("user-info");

  return (
    <Avatar className="bg-gray-300 flex items-center justify-center w-15 h-15 font-bold text-2xl tracking-widest">
      ...
    </Avatar>
  );
}
