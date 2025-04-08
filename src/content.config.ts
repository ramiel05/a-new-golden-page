import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const bookmarks = defineCollection({
  loader: file("src/data/bookmarks.json"),
  schema: z.object({
    id: z.number(), // TODO how should i handle IDs? manually increment them? surely there a library way to do it
    type: z.enum(["page", "site"]),
    url: z.string(),
    name: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { bookmarks };
