import { z } from "zod";

const emailSchema = z
  .string({
    required_error: "Email is required",
  })
  .email("Please provide valid email");

const passwordSchema = z
  .string({
    required_error: "Password is required",
  })
  .min(6, "Password must be at least 6 or more characters");

export const signupBodySchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
  }),
  lastName: z.string({
    required_error: "Last name is required",
  }),
  avatarUrl: z
    .string({
      invalid_type_error: "Avatar url must be a string",
    })
    .optional(),
  email: emailSchema,
  password: passwordSchema,
});

export const loginBodySchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
