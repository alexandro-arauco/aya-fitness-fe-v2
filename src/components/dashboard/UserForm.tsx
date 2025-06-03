"use client";

import InputWithValidation from "@/components/InputWithValidation";
import SelectWithValidation from "@/components/SelectWithValidation";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import DatePicker from "../DatePicker";

export default function UserForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="first_name"
              name="first_name"
              label="First Name"
              placeholder="Enter your First Name"
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="last_name"
              name="last_name"
              label="Last Name"
              placeholder="Enter your Last Name"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-full">
            <SelectWithValidation form={form} id="sex" name="sex" label="Sex" />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="last_name"
              name="last_name"
              label="Last Name"
              placeholder="Enter your Last Name"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              placeholder="Ex. +1 12345678"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-full">
            <SelectWithValidation
              form={form}
              id="fitness_level"
              name="fitness_level"
              label="Fitness Level"
            />
          </div>
          <div className="w-full">
            <DatePicker form={form} label="Date of Birth" />
          </div>
        </div>
      </form>
    </Form>
  );
}
