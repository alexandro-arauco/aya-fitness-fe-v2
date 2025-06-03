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
            {type === "file" ? (
              <Input
                className="h-10 border-gray-300 rounded-md border-dashed"
                id={id}
                placeholder={placeholder}
                type={type}
                accept="image/png"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log({ e });
                  form.setValue(
                    name,
                    e.target.files ? e.target.files[0] : null
                  );
                }}
              />
            ) : (
              <Input
                className="h-10 border-gray-300 rounded-md"
                id={id}
                placeholder={placeholder}
                type={type}
                autoComplete="off"
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
