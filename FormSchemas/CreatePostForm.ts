import { z } from "zod";

export const postFormSchema = z.object({
  content: z
    .string({
      required_error: "Content is required!",
      invalid_type_error: "Content must be a string",
    })
    .min(1, {
      message: "Content should have at least 1 characters.",
    }),
  anonymous: z.boolean().default(false).optional(),
  src: z.string({
    required_error: "Emoji is required!",
  }),
  userId: z.string(),
});
