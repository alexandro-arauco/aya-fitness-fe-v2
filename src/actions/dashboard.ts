"use server";

import axiosInstance from "@/lib/api";
import {
  ClientCreate,
  ClientSchema,
  GymCreate,
  GymSchema,
} from "@/schemas/dashboard-schema";

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

    return {
      user: response.data,
    };
  } catch (error) {
    console.log({ error });
    return error;
  }
}

export async function NewGymAction(values: GymCreate, userId: number) {
  const parsed = GymSchema.omit({ id: true }).safeParse(values);
  if (!parsed.success) throw new Error("Invalid data");

  try {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        if (key === "logo") formData.append("logo", value);

        formData.append(key, value);
      }
    });

    const response = await axiosInstance.post("/gyms/", formData, {
      headers: {
        "X-User-ID": userId,
      },
    });

    return {
      user: response.data,
    };
  } catch (error) {
    console.error("Error in NewGymAction:", error);
    throw error; // or return { error: error.message }
  }
}
