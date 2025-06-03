"use client";

import InputWithValidation from "@/components/InputWithValidation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { GymCreate, GymSchema } from "@/schemas/dashboard-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewGymAction } from "@/actions/dashboard";
import axiosInstance from "@/lib/api";

export default function GymForm({ userId }: { userId: number }) {
  const form = useForm<GymCreate>({
    resolver: zodResolver(GymSchema.omit({ id: true })),
    defaultValues: {
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
      await queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: (error) => console.error(error),
  });

  const onSubmit = (values: GymCreate) => {
    mutate(values);
  };

  const createNewGym = async (values: GymCreate) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        if (key === "logo") formData.append("logo", value);

        formData.append(key, value);
      }
    });

    await axiosInstance.post("/gyms/", formData, {
      headers: {
        "X-User-ID": userId,
      },
    });
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

        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="job_title"
              name="job_title"
              label="Job Title"
              placeholder="Ex. Owner, Manager, etc"
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="email"
              name="email"
              label="Email"
              placeholder="Ex. jhon.doe@test.com"
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
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="gym_website"
              name="gym_website"
              label="Gym Website"
              placeholder="Ex. www.mygym.com"
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
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="city"
              name="city"
              label="City"
              placeholder="Enter your City"
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
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="postal_code"
              name="postal_code"
              label="ZIP/Postal Code"
              placeholder="Enter your ZIP/Postal Code"
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
            />
          </div>
          <div className="w-full">
            <InputWithValidation
              form={form}
              id="logo"
              name="logo"
              label="Personal Logo"
              type="file"
            />
            <p className="mt-1 text-xs text-gray-500">
              Supported formats: PNG. Max size: 2MB.
            </p>
          </div>
        </div>

        <Button className="w-full mt-4 cursor-pointer">
          {isPending ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
