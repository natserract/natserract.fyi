import { defineCollection, z } from "astro:content";

export const collections = {
  post: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      heroImg: z.string().optional(),
    }),
  }),
  note: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      link: z.string().optional(),
      keywords: z.string().optional(),
    }),
  }),
  project: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      cover: z.string().optional(),
      external: z.string().optional(),
      category: z.string().optional(),
    }),
  }),
};
