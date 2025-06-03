import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputWithValidationProps {
  form: UseFormReturn<any, any, any>;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "date";
}

export default function InputWithValidation({
  form,
  id,
  name,
  label,
  placeholder = "",
  type = "text",
}: InputWithValidationProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="h-10 border-gray-300 rounded-md"
              id={id}
              placeholder={placeholder}
              type={type}
              autoComplete="off"
              {...field}
            />
          </FormControl>

          <FormMessage className="text-sm italic" />
        </FormItem>
      )}
    />
  );
}
