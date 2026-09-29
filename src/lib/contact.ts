import { z } from "zod";

// Shared by the form (instant feedback) and the API route (the check that counts).

// Control characters are rejected in single-line fields so nothing can smuggle a
// line break into the email subject or headers.
const singleLine = /^[^\p{Cc}]*$/u;

export const projectTypes = [
  "Business web app",
  "AI feature",
  "Website",
  "Mobile app",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please add your name.")
    .max(100, "That name is too long.")
    .regex(singleLine, "Please use plain text."),
  email: z.email("That email address doesn't look right.").max(254),
  company: z
    .string()
    .trim()
    .max(120, "That's too long.")
    .regex(singleLine, "Please use plain text.")
    .optional()
    .default(""),
  projectType: z.enum(projectTypes),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps. At least 20 characters.")
    .max(5000, "Please keep it under 5,000 characters."),
  // Honeypot: hidden from people, filled in by naive bots.
  website: z.string().max(200).optional().default(""),
  // When the form was rendered, to reject instant (scripted) submissions.
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.input<typeof contactSchema>;
