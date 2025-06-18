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
  type?: "text" | "password" | "date" | "file";
  disable?: boolean;
}

export default function InputWithValidation({
  form,
  id,
  name,
  label,
  placeholder = "",
  type = "text",
  disable = false,
}: InputWithValidationProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "file" ? (
              <Input
                className="h-10 border-gray-300 rounded-md border-dashed"
                id={id}
                placeholder={placeholder}
                type={type}
                accept="image/png"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  form.setValue(
                    name,
                    e.target.files ? e.target.files[0] : null
                  );
                }}
                disabled={disable}
              />
            ) : (
              <Input
                className="h-10 border-gray-300 rounded-md disabled:text-black disabled:opacity-100 disabled:bg-gray-300"
                id={id}
                placeholder={placeholder}
                type={type}
                autoComplete="off"
                disabled={disable}
                {...field}
              />
            )}
          </FormControl>

          <FormMessage className="text-sm italic" />
        </FormItem>
      )}
    />
  );
}
