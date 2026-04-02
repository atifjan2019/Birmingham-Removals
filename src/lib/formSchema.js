import { z } from "zod";

export const step1Schema = z.object({
  moveType: z.enum(["house", "office", "studio", "single"], {
    required_error: "Please select a move type",
  }),
});

export const step2Schema = z.object({
  fromPostcode: z
    .string()
    .min(1, "Postcode is required")
    .regex(
      /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/,
      "Enter a valid UK postcode"
    ),
  toPostcode: z
    .string()
    .min(1, "Postcode is required")
    .regex(
      /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/,
      "Enter a valid UK postcode"
    ),
  moveDate: z.string().optional(),
  bedrooms: z.number().min(0).max(6).optional(),
});

export const step3Schema = z.object({
  extras: z.array(z.string()).optional(),
});

export const step4Schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s+()-]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  referral: z.string().optional(),
});

export const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);
