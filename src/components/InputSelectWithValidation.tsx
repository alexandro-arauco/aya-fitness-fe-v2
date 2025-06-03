import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface InputSelectWithValidationProps {
  form: UseFormReturn;
  id: string;
  name: string;
  label: string;
  placeholder: string;
}

export default function InputSelectWithValidation({
  form,
  id,
  name,
  label,
  placeholder,
}: InputSelectWithValidationProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex border border-gray-300 rounded-md">
              <Input
                className="h-10 border-none shadow-none focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                id={id}
                placeholder={placeholder}
                autoComplete="off"
                {...field}
              />
              <Select>
                <SelectTrigger className="!h-10 border-t-0 border-r-0 border-b-0 border-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-none">
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
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
