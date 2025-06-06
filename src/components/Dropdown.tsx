import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DropdownProps {
  onChange: (value: string) => void;
  value: string | null;
  data: { value: string; label: string }[];
}

export default function Dropdown({ onChange, value, data }: DropdownProps) {
  return (
    <Select onValueChange={onChange} value={value ? value : undefined}>
      <SelectTrigger className="!h-10 w-full border border-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>

      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
