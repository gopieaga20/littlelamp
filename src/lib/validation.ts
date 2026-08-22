import { z } from "zod";

// Shared between the client form (react-hook-form resolver) and the API route,
// so validation rules can never drift between the two.
export const leadFormSchema = z.object({
  parentName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{10,15}$/, "Enter a valid phone number"),
  childClass: z.string().trim().min(1, "Please select your child's class"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.enum(["CONTACT_FORM", "BOOKING_FORM"]).default("CONTACT_FORM"),
  // Honeypot field: real users never fill this in; bots that auto-fill every
  // input will, letting us silently drop spam without a CAPTCHA dependency.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const classOptions = [
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];
