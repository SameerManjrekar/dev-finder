import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should bbe minimum 6 characters" }),
});
