"use client";

import InputWithValidation from "@/components/InputWithValidation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginSchema, LoginType } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const onSubmit = (values: LoginType) => {
    console.log(values);
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
          placeholder="********"
        />

        <Button className="w-full">LOGIN</Button>
      </form>
    </Form>
  );
}
