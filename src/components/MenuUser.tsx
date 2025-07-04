"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MenuItem } from "@/interfaces/menu/menu";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuUserProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
}
export default function MenuUser({ children, menuItems }: MenuUserProps) {
  const { clearStorage } = useLocalStorage();
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    clearStorage();
    queryClient.clear();

    router.push("/");
  };

  console.log(menuItems);

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent className="w-50 rounded-md shadow-none border-gray-300 mr-3">
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:font-bold"
              key={item.label}
              href={item.link}
            >
              {information?.type === "admin" &&
              ["Assessment Profile"].includes(item.label)
                ? "Member Profile"
                : item.label}
            </Link>
          ))}

          <div
            className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:font-bold"
            onClick={handleLogout}
          >
            Log out
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
