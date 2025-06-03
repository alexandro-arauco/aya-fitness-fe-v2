import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface SelectWithValidationProps {
  form: UseFormReturn<any, any, any>;
  name: string;
  label: string;
  data: { value: string; label: string }[];
}

export default function SelectWithValidation({
  form,
  name,
  label,
  data,
}: SelectWithValidationProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
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
          </FormControl>
        </FormItem>
      )}
    />
  );
}
