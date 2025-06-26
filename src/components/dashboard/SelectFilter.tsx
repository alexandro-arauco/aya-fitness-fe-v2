"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFilterProps {
  onChange: (value: string) => void;
}

export default function SelectFilter({ onChange }: SelectFilterProps) {
  return (
    <Select onValueChange={onChange} defaultValue="all">
      <SelectTrigger className="!h-10 w-full md:w-1/3 border border-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]">
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
