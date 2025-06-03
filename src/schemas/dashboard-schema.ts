import * as z from "zod";

const fileSchema = z
  .custom<File>((val) => val instanceof File, {
    message: "Input must be a valid File object",
  })
  .refine(
    (file) => {
      if (!file) return true; // Skip validation if no file
      return file.type === "image/png";
    },
    {
      message: "File must be a PNG image",
    }
  )
  .refine(
    (file) => {
      if (!file) return true; // Skip validation if no file
      const maxSize = 2 * 1024 * 1024; // 2MB
      return file.size <= maxSize;
    },
    {
      message: "File size must be less than 2MB",
    }
  );

const BaseUserSchema = z.object({
  id: z.number().optional().default(0),
  first_name: z.string().min(3, { message: "Required" }),
  last_name: z.string().min(3, { message: "Required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone_number: z.string().optional(),
});

export const GymSchema = BaseUserSchema.extend({
  job_title: z.string().min(5, { message: "Required" }),
  gym_name: z.string().min(5, { message: "Required" }),
  gym_website: z.string().optional(),
  street_address: z.string().min(5, { message: "Required" }),
  city: z.string().min(5, { message: "Required" }),
  state_province: z.string().min(2, { message: "Required" }),
  postal_code: z.string().min(5, { message: "Required" }),
  country: z.string().min(5, { message: "Required" }),
  logo: fileSchema.nullable().default(null).or(z.string().optional()),
});

export const ClientSchema = BaseUserSchema.extend({
  sex: z.string().min(1, { message: "Required" }),
  dob: z
    .string()
    .transform((val) => val.split("T")[0]) // Ensure correct format
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Date must be in yyyy-MM-dd format",
    }),
  height: z
    .string()
    .min(1, { message: "Required" })
    .refine((val) => /^\d+(\.\d+)?$/.test(val), {
      message: "Must be a number",
    }),
  weight: z
    .string()
    .min(1, { message: "Required" })
    .refine((val) => /^\d+(\.\d+)?$/.test(val), {
      message: "Must be a number",
    }),
  fitness_level: z.string().min(1, { message: "Required" }),
  height_metric: z.string().min(1, { message: "Required" }),
  weight_metric: z.string().min(1, { message: "Required" }),
});

export type Gym = z.infer<typeof GymSchema>; //Gym Record
export type Client = z.infer<typeof ClientSchema>;
//export type Client = z.infer<ReturnType<typeof ClientSchema.omit<{ id: true }>>>; //Client Record

export type ClientCreate = Omit<Client, "id">;
export type GymCreate = Omit<Gym, "id">;

export interface ClientTable extends Client {
  last_assessment: string;
}
