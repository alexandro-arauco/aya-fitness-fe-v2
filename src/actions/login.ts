"use server";

import axiosInstance from "@/lib/api";
import { LoginSchema, LoginType } from "@/schemas/login-schema";

export async function LoginAction(data: LoginType) {
  const parsed = LoginSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid Data");
  }

  const { email, password } = parsed.data;

  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });

    return {
      user: response.data,
    };
  } catch (error) {
    return error;
  }
}
