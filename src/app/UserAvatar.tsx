"use client";

import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import { getInitials } from "@/utils/dashboard/commons";

export default function UserAvatar() {
  const { userInfo: information } = useAuth();

  return (
    <Avatar className="bg-gray-300 flex items-center justify-center w-15 h-15 font-bold text-2xl tracking-widest">
      {getInitials(`${information.first_name} ${information.last_name}`)}
    </Avatar>
  );
}
