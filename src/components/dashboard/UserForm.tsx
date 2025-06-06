"use client";

import { NewClientAction } from "@/actions/dashboard";
import DatePicker from "@/components/DatePicker";
import InputSelectWithValidation from "@/components/InputSelectWithValidation";
import InputWithValidation from "@/components/InputWithValidation";
import SelectWithValidation from "@/components/SelectWithValidation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ClientCreate, ClientSchema } from "@/schemas/dashboard-schema";
import {
  DATA_FITNESS_LEVEL,
  DATA_GENDERS,
  DATA_HEIGHT_METRIC,
  DATA_WEIGHT_METRIC,
  getCurrentDate,
} from "@/utils/dashboard/commons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface UserFormProps {
  userId: number;
  labelAction?: string;
  defaultValues?: ClientCreate | null;
}

export default function UserForm({
  userId,
  labelAction = "Create",
  defaultValues = null,
}: UserFormProps) {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  const userGymId = information?.id;

  const form = useForm<ClientCreate>({
    resolver: zodResolver(ClientSchema.omit({ id: true })),
    defaultValues: defaultValues
      ? defaultValues
      : {
          first_name: "",
          last_name: "",
          sex: DATA_GENDERS[0].value,
          email: "",
          phone_number: "",
          fitness_level: DATA_FITNESS_LEVEL[0].value,
          dob: getCurrentDate(),
          height: "",
          height_metric: DATA_HEIGHT_METRIC[0].value,
          weight: "",
          weight_metric: DATA_WEIGHT_METRIC[0].value,
        },
    mode: "onBlur",
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: ClientCreate) => NewClientAction(values, userGymId),
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

  const onSubmit = (values: ClientCreate) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-4 py-3" onSubmit={form.handleSubmit(onSubmit)}>
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
            <SelectWithValidation
              form={form}
              name="sex"
              label="Sex"
              data={DATA_GENDERS}
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

        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <SelectWithValidation
              form={form}
              name="fitness_level"
              label="Fitness Level"
              data={DATA_FITNESS_LEVEL}
            />
          </div>
          <div className="w-full">
            <DatePicker form={form} label="Date of Birth" />
          </div>
        </div>

        <div className="flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full">
            <InputSelectWithValidation
              form={form}
              id="height"
              label={`Height (${form.watch("height_metric")})`}
              name="height"
              placeholder="E.x. 180"
              dataSelect={DATA_HEIGHT_METRIC}
              selectName="height_metric"
              error={form.formState.errors.height?.message || ""}
            />
          </div>
          <div className="w-full">
            <InputSelectWithValidation
              form={form}
              id="weight"
              label={`Weight (${form.watch("weight_metric")})`}
              name="weight"
              placeholder="E.x. 180"
              dataSelect={DATA_WEIGHT_METRIC}
              selectName="weight_metric"
              error={form.formState.errors.weight?.message || ""}
            />
          </div>
        </div>

        <Button className="w-full mt-4 cursor-pointer">{labelAction}</Button>
      </form>
    </Form>
  );
}
