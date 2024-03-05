import { AttributeType } from "@prisma/client";
import { z } from "zod";

export const createAttributesSchema = z.object({
  label: z.string({ required_error: "Label is required" }),
  code: z.string({ required_error: "Code is required" }),
  type: z.custom<AttributeType>((val) => !!AttributeType[val as AttributeType]),
  isRequired: z.boolean({ required_error: "isRequired is required" }),
  isPublic: z.boolean().optional(),
  attributeValues: z
    .array(
      z.object({
        code: z.string({ required_error: "Code is required" }),
        name: z.string({ required_error: "Name is required" }),
        value: z.string().optional(),
      }),
    )
    .optional(),
  metadata: z
    .array(
      z.object({
        code: z.string({ required_error: "Code is required" }),
        value: z.string({ required_error: "Value is required" }),
      }),
    )
    .optional(),
});

export const updateAttributesSchema = z.object({
  label: z.string({ required_error: "Label is required" }).optional(),
  code: z.string({ required_error: "Code is required" }).optional(),
  type: z.custom<AttributeType>((val) => !!AttributeType[val as AttributeType]),
  isRequired: z
    .boolean({ required_error: "isRequired is required" })
    .optional(),
  isPublic: z.boolean().optional(),
  attributeValues: z
    .array(
      z.object({
        code: z.string({ required_error: "Code is required" }),
        name: z.string({ required_error: "Name is required" }),
        value: z.string().optional(),
      }),
    )
    .optional(),
  metadata: z
    .array(
      z.object({
        code: z.string({ required_error: "Code is required" }),
        value: z.string({ required_error: "Value is required" }),
      }),
    )
    .optional(),
});
