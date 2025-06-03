"use server";

import axiosInstance from "@/lib/api";
import { ClientCreate, ClientSchema } from "@/schemas/dashboard-schema";

export async function NewClientAction(values: ClientCreate, userId: number) {
  const parsed = ClientSchema.omit({ id: true }).safeParse(values);

  if (!parsed.success) throw new Error("Invalid Data");

  try {
    const response = await axiosInstance.post(
      "/clients/",
      { ...parsed.data },
      {
        headers: {
          "X-User-ID": userId,
        },
      }
    );

    console.log({ values, userId });

    return {
      user: response.data,
    };
  } catch (error) {
    console.log({ error });
    return error;
  }
}
