import * as z from "zod";

export const roomSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  language: z.string().min(1, { message: "Language is required" }),
  githubLink: z.string().optional(),
});
