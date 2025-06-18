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
import Dropdown from "./Dropdown";

interface SelectWithValidationProps {
  form: UseFormReturn<any, any, any>;
  name: string;
  label: string;
  data: { value: string; label: string }[];
  disable?: boolean;
}

export default function SelectWithValidation({
  form,
  name,
  label,
  data,
  disable = false,
}: SelectWithValidationProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Dropdown
              data={data}
              onChange={field.onChange}
              value={field.value}
              disable={disable}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
