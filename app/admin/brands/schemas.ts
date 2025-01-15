import { z } from "zod";
import type { ServerBrand } from "./server-types";

export const brandSchema: z.ZodType<ServerBrand> = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  logo: z.string(),
  logoDark: z.string(),
  mainImage: z.string(),
  address: z.string(),
  slug: z.string(),
  phone: z.string(),
  email: z.string(),
  workingHours: z.object({
    weekdays: z.string(),
    weekends: z.string()
  }),
  scrollerTexts: z.array(z.string()),
  aboutTitle: z.string(),
  aboutText: z.string(),
  aboutIcon: z.string(),
  brandHistory: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string()
  }),
  atmosphere: z.object({
    title: z.string(),
    description: z.string(),
    images: z.array(z.string()),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    }))
  }),
  events: z.array(z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    icon: z.string()
  })),
  features: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string()
  }))
}); 