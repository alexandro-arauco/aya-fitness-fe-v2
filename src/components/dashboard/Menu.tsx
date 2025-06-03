import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import SelectFilter from "@/components/dashboard/SelectFilter";
import { PlusIcon, SearchIcon } from "lucide-react";
import ButtonNewRecord from "@/components/dashboard/ButtonNewRecord";

export default function Menu() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-3xl">Member List</div>
        <ButtonNewRecord />
      </div>

      <Card className="rounded-md shadow-md">
        <CardContent className="flex flex-col items-center md:flex-row px-3 space-y-3 md:space-x-3 md:space-y-0 md:justify-between">
          <div className="flex w-full md:w-2/3 items-center border border-gray-300 rounded-md shadow-2xl space-x-1 px-2 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
            <SearchIcon className="opacity-60" />
            <Input
              className="h-10 border-none shadow-none focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
              type="text"
              placeholder="Search..."
            />
          </div>

          <SelectFilter />
        </CardContent>
      </Card>
    </div>
  );
}
