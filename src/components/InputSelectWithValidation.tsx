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
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";

interface InputSelectWithValidationProps {
  form: UseFormReturn<any, any, any>;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  dataSelect: { value: string; label: string }[];
  selectName: string;
  error: string;
}

export default function InputSelectWithValidation({
  form,
  id,
  name,
  label,
  placeholder,
  dataSelect,
  selectName,
  error,
}: InputSelectWithValidationProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div
            className={clsx(
              "flex border border-gray-300 rounded-md",
              error
                ? "border-red-500 focus-within:border-ring-destructive focus-within:ring-ring/50 focus-within:ring-[3px]"
                : "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
            )}
          >
            <FormControl>
              <Input
                className="h-10 border-none shadow-none focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                id={id}
                placeholder={placeholder}
                autoComplete="off"
                {...field}
              />
            </FormControl>
            <FormControl>
              <Select
                onValueChange={(value) => form.setValue(selectName, value)}
                value={form.getValues(selectName)}
              >
                <SelectTrigger className="!h-10 border-t-0 border-r-0 border-b-0 border-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-none">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>

                <SelectContent>
                  {dataSelect.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>

          <FormMessage className="text-sm italic" />
        </FormItem>
      )}
    />
  );
}
