import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password Required" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
