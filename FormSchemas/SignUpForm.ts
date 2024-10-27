import { z } from "zod";

export const signupFormSchema = z.object({
  username: z
    .string({
      required_error: "username is required!",
      invalid_type_error: "username must be a string",
    })
    .min(2, {
      message: "username should have at least 2 characters.",
    })
    .max(20, {
      message: "username cannot have more than 20 characters.",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, {
      message: "password should have at least 6 characters.",
    })
    .max(20, {
      message: "password cannot have more than 20 characters.",
    }),
});
