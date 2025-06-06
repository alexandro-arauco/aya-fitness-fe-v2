"use client";

import { LoginAction } from "@/actions/login";
import InputWithValidation from "@/components/InputWithValidation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LoginSchema, LoginType } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const queryClient = useQueryClient();
  type LoginResponse = { user: Record<string, any> } | {};
  const router = useRouter();
  const { setItem } = useLocalStorage();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginType): Promise<LoginResponse> =>
      (await LoginAction(values)) as LoginResponse,
    onSuccess: (data) => {
      if ("user" in data && data.user) {
        setItem("user-info", data.user);
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      console.log(error);
      form.setError("password", { message: "Invalid credentials..." });
    },
  });

  const onSubmit = (values: LoginType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <InputWithValidation
          form={form}
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <InputWithValidation
          form={form}
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="********"
        />

        <Button className="w-full" disabled={isPending}>
          {isPending ? "LOGGING IN" : "LOGIN"}
        </Button>
      </form>
    </Form>
  );
}
