import { z } from "zod";

export const createProductTypeSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  isShippable: z.boolean({ required_error: "Shippable is required" }),
  attributeIds: z.array(z.string({ required_error: "Attributes is required" })),
  metadata: z
    .array(
      z.object({
        name: z.string({ required_error: "Name is required" }),
        code: z.string({ required_error: "Code is required" }),
      }),
    )
    .optional(),
});

export const updateProductTypeSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  isShippable: z.boolean({ required_error: "Shippable is required" }),
  attributeIds: z.array(z.string({ required_error: "Attributes is required" })),
  metadata: z
    .array(
      z.object({
        name: z.string({ required_error: "Name is required" }),
        code: z.string({ required_error: "Code is required" }),
      }),
    )
    .optional(),
});
