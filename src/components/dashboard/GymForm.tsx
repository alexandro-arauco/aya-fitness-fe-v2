"use client";

import { NewGymAction } from "@/actions/dashboard";
import InputWithValidation from "@/components/InputWithValidation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { GymCreate, GymSchema } from "@/schemas/dashboard-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface GymFormProps {
  userId: number;
  labelAction?: string;
  defaultValues?: GymCreate | null;
  disable?: boolean;
}

export default function GymForm({
  userId,
  labelAction = "Create",
  defaultValues = null,
  disable = false,
}: GymFormProps) {
  const form = useForm<GymCreate>({
    resolver: zodResolver(GymSchema.omit({ id: true })),
    defaultValues: defaultValues
      ? defaultValues
      : {
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          job_title: "",
          gym_name: "",
          gym_website: "",
          street_address: "",
          city: "",
          state_province: "",
          postal_code: "",
          country: "",
          logo: "",
        },
    mode: "onBlur",
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: GymCreate) => NewGymAction(values, userId),
    onSuccess: async (data) =>
      await queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: false,
      }),
    onError: async (error) =>
      await queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: false,
      }),
  });

  console.log({ defaultValues });

  const onSubmit = (values: GymCreate) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-4 py-3" onSubmit={form.handleSubmit(onSubmit)}>
        <Label>Primary Contact Information</Label>
        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="first_name"
              name="first_name"
              label="First Name"
              placeholder="Enter your First Name"
              disable={disable}
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="last_name"
              name="last_name"
              label="Last Name"
              placeholder="Enter your Last Name"
              disable={disable}
            />
          </div>
        </div>

        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="job_title"
              name="job_title"
              label="Job Title"
              placeholder="Ex. Owner, Manager, etc"
              disable={disable}
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="email"
              name="email"
              label="Email"
              placeholder="Ex. jhon.doe@test.com"
              disable={disable}
            />
          </div>
        </div>

        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              placeholder="Ex. +1 123456789"
              type="text"
              disable={disable}
            />
          </div>
        </div>

        <Label>Gym Information</Label>
        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="gym_name"
              name="gym_name"
              label="Gym Name"
              placeholder="Enter Gym Name"
              disable={disable}
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="gym_website"
              name="gym_website"
              label="Gym Website"
              placeholder="Ex. www.mygym.com"
              disable={disable}
            />
          </div>
        </div>

        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="street_address"
              name="street_address"
              label="Street Address"
              placeholder="Enter your Street Address"
              disable={disable}
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="city"
              name="city"
              label="City"
              placeholder="Enter your City"
              disable={disable}
            />
          </div>
        </div>

        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="state_province"
              name="state_province"
              label="State/Province"
              placeholder="Enter your State/Province"
              disable={disable}
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="postal_code"
              name="postal_code"
              label="ZIP/Postal Code"
              placeholder="Enter your ZIP/Postal Code"
              disable={disable}
            />
          </div>
        </div>

        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="country"
              name="country"
              label="Country"
              placeholder="Enter your Country"
              disable={disable}
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="logo"
              name="logo"
              label="Personal Logo"
              type="file"
              disable={disable}
            />
            <p className="mt-1 text-xs text-gray-500">
              Supported formats: PNG. Max size: 2MB.
            </p>
          </div>
        </div>

        <Button className="w-full mt-4  cursor-pointer" disabled={disable}>
          {labelAction}
        </Button>
      </form>
    </Form>
  );
}
