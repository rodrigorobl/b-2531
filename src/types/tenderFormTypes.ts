
import { z } from "zod";

export type TenderType = 'design' | 'construction' | 'service';
export type TenderPrivacy = 'open' | 'restricted' | 'closed';

// Schema for the tender form
export const tenderSchema = z.object({
  type: z.enum(["design", "construction", "service"] as const),
  privacy: z.enum(["open", "restricted", "closed"] as const),
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  description: z.string().optional(),
  // Common fields will be required for all tender types
  location: z.string().min(3, "Veuillez indiquer une adresse valide"),
  budget: z.string().min(1, "Veuillez indiquer un budget estimatif"),
  deadline: z.date({
    required_error: "Veuillez sélectionner une date limite"
  }),
  // Optional fields depending on tender type
  projectNature: z.string().optional(),
  area: z.string().optional(),
  constructionType: z.string().optional(),
  serviceScope: z.string().optional(),
  serviceDuration: z.string().optional(),
  documents: z.array(z.object({
    name: z.string(),
    size: z.number()
  })).optional()
});

export type TenderFormValues = z.infer<typeof tenderSchema>;
