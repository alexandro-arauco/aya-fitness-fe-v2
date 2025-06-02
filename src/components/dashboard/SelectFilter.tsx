"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectFilter() {
  return (
    <Select onValueChange={(value) => console.log(value)} defaultValue="all">
      <SelectTrigger className="!h-10 w-full md:w-1/3 border border-gray-300">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="day">Last Day</SelectItem>
        <SelectItem value="week">Last Week</SelectItem>
        <SelectItem value="month">Last Month</SelectItem>
        <SelectItem value="year">Last Year</SelectItem>
      </SelectContent>
    </Select>
  );
}
