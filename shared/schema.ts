import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  author: text("author").notNull(),
  publishDate: timestamp("publish_date").notNull(),
  content: text("content").notNull(),
  bannerImage: text("banner_image").notNull(),
  extras: jsonb("extras").notNull().$type<{ youtubeVideoLink?: string }>()
});

export const blogSchema = createInsertSchema(blogs).extend({
  extras: z.object({
    youtubeVideoLink: z.string().optional(),
  }),
});

export type Blog = typeof blogs.$inferSelect;
export type InsertBlog = z.infer<typeof blogSchema>;