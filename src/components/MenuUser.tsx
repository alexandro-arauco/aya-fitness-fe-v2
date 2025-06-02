import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MenuUserProps {
  children: React.ReactNode;
}
export default function MenuUser({ children }: MenuUserProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-50 rounded-md shadow-none border-gray-300 mr-3">
        Links
      </PopoverContent>
    </Popover>
  );
}
