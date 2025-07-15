import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

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
  const [visible, setVisible] = useState(false);

  const renderIconPassword = () => {
    if (type === "password") {
      return (
        <span
          className="mr-3 cursor-pointer relative w-5 h-5 flex items-center justify-center"
          onClick={() => setVisible((v) => !v)}
        >
          <EyeClosed
            className={clsx(
              "absolute transition-all duration-200 ease-in-out",
              visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
            style={{ pointerEvents: visible ? "auto" : "none" }}
          />
          <EyeIcon
            className={clsx(
              "absolute transition-all duration-200 ease-in-out",
              !visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
            style={{ pointerEvents: !visible ? "auto" : "none" }}
          />
        </span>
      );
    }
    return null;
  };

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
              <div
                className={clsx(
                  "flex flex-row items-center space-x-1",
                  type === "password" &&
                    "border border-gray-300 rounded-md focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
                )}
              >
                <Input
                  className={clsx(
                    "h-10 disabled:text-black disabled:opacity-100 disabled:bg-gray-300",
                    type === "password" &&
                      "border-none focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none",
                    type !== "password" && "border-gray-300 rounded-md"
                  )}
                  id={id}
                  placeholder={placeholder}
                  type={
                    type === "password" ? (visible ? "text" : "password") : type
                  }
                  autoComplete="off"
                  disabled={disable}
                  {...field}
                />
                {type === "password" ? renderIconPassword() : null}
              </div>
            )}
          </FormControl>

          <FormMessage className="text-sm italic" />
        </FormItem>
      )}
    />
  );
}
