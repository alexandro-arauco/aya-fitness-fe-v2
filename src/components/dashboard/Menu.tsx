import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import SelectFilter from "@/components/dashboard/SelectFilter";

export default function Menu() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-3xl">Member List</div>
        <Button className="font-semibold">Add Member</Button>
      </div>

      <Card className="rounded-md shadow-md">
        <CardContent className="flex flex-col items-center md:flex-row px-3 space-y-3 md:space-x-3 md:space-y-0 md:justify-between">
          <Input
            className="h-10 w-full md:w-2/3 border-gray-300"
            type="text"
            placeholder="Search..."
          />

          <SelectFilter />
        </CardContent>
      </Card>
    </div>
  );
}
