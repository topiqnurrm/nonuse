import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export type Login = z.infer<typeof loginSchema>;
export const loginSchema = z.strictObject({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type User = z.infer<typeof userSchema>;
export const userSchema = z.strictObject({
  id: z.uuidv7(),
  name: z.string(),
  email: z.string(),
  avatar_url: z.string(),
});
