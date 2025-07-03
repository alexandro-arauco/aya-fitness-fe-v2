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
  disable?: boolean;
  placeholder?: string;
}

export default function Dropdown({
  onChange,
  value,
  data,
  disable = false,
  placeholder = "Select an option",
}: DropdownProps) {
  return (
    <Select
      onValueChange={onChange}
      value={value ? value : undefined}
      disabled={disable}
    >
      <SelectTrigger className="!h-10 w-full border border-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:bg-gray-300 disabled:opacity-100">
        <SelectValue placeholder={placeholder} />
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
