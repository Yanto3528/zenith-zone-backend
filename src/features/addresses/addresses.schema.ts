import { z } from "zod";

export const createAddressSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, "Last name must be at least 3 characters"),
  streetAddress: z
    .string({ required_error: "Street address is required" })
    .min(10, "Street address must be at least 10 characters"),
  streetAddress2: z.string().optional(),
  city: z
    .string({ required_error: "City is required" })
    .min(5, "City must be at least 5 characters"),
  postalCode: z
    .string({ required_error: "Postal code is required" })
    .min(4, "Postal code must be at least 4 characters"),
  country: z
    .string({ required_error: "Country is required" })
    .min(3, "Country must be at least 3 characters"),
  countryArea: z
    .string({ required_error: "Country area is required" })
    .min(10, "Country area must be at least 10 characters")
    .optional(),
});

export const updateAddressSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, "First name must be at least 3 characters")
    .optional(),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, "Last name must be at least 3 characters")
    .optional(),
  streetAddress: z
    .string({ required_error: "Street address is required" })
    .min(10, "Street address must be at least 10 characters")
    .optional(),
  streetAddress2: z.string().optional(),
  city: z
    .string({ required_error: "City is required" })
    .min(5, "City must be at least 5 characters")
    .optional(),
  postalCode: z
    .string({ required_error: "Postal code is required" })
    .min(4, "Postal code must be at least 4 characters")
    .optional(),
  country: z
    .string({ required_error: "Country is required" })
    .min(3, "Country must be at least 3 characters")
    .optional(),
  countryArea: z
    .string({ required_error: "Country area is required" })
    .min(10, "Country area must be at least 10 characters")
    .optional(),
  isDefault: z.boolean().optional(),
});
