"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputWithValidation from "@/components/InputWithValidation";
import { Button } from "../ui/button";

export default function LoginForm() {
  const form = useForm();

  const onSubmit = (values: any) => {
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
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />

        <Button className="w-full">LOGIN</Button>
      </form>
    </Form>
  );
}
