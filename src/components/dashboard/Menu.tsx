"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import ButtonNewRecord from "@/components/dashboard/ButtonNewRecord";
import SelectFilter from "@/components/dashboard/SelectFilter";
import { SearchIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounde";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Menu() {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(["filterQuery"], debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-3xl">
          {information?.type === "admin" ? "Gym" : "Member"} List
        </div>
        <ButtonNewRecord />
      </div>

      <Card className="rounded-md shadow-md bg-white">
        <CardContent className="flex flex-col items-center md:flex-row px-3 space-y-3 md:space-x-3 md:space-y-0 md:justify-between">
          <div className="flex w-full md:w-2/3 items-center border border-gray-300 rounded-md shadow-2xl space-x-1 px-2 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] h-10">
            <SearchIcon className="opacity-60" />
            <Input
              className="h-10 border-none shadow-none focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>

          <SelectFilter
            onChange={(value) => {
              queryClient.setQueryData(["filterCreatedAt"], value);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
