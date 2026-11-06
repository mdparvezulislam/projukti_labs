import { z } from "zod";

export const BlogCategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
});

export type BlogCategory = z.infer<typeof BlogCategorySchema>;

export const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  categoryName: z.string(),
  tags: z.array(z.string()),
  author: z.object({
    name: z.string(),
    role: z.string(),
    avatarUrl: z.string().optional(),
  }),
  coverImage: z.string().optional(),
  imageAlt: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  readingTimeMinutes: z.number().int().positive(),
  featured: z.boolean().default(false),
  seoTitle: z.string(),
  seoDescription: z.string(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

