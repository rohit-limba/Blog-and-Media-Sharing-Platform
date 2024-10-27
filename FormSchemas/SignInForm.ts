import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string({
      required_error: "username is required!",
      invalid_type_error: "username must be a string",
    })
    .min(2, {
      message: "username should have at least 2 characters.",
    })
    .max(30, {
      message: "username cannot have more than 20 characters.",
    }),
  password: z
    .string()
    .min(6, {
      message: "password is required.",
    })
    .max(20, {
      message: "password is required.",
    }),
});
