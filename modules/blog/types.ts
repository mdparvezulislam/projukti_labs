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
  subtitle: z.string().optional().nullable(),
  excerpt: z.string(),
  content: z.string(),
  contentFormat: z.enum(["html", "markdown"]).optional(),
  contentPlainText: z.string().optional().nullable(),
  category: z.string(),
  categoryName: z.string(),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()),
  author: z.object({
    name: z.string(),
    role: z.string(),
    avatarUrl: z.string().optional(),
  }),
  coverImage: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  imageTitle: z.string().optional().nullable(),
  imageCaption: z.string().optional().nullable(),
  imageCredit: z.string().optional().nullable(),
  status: z.enum(["draft", "published", "scheduled", "archived"]).optional(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  scheduledAt: z.string().optional().nullable(),
  readingTimeMinutes: z.number().int().positive().default(5),
  featured: z.boolean().default(false),
  isFeatured: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  wordCount: z.number().optional(),
  headingCount: z.number().optional(),
  tableOfContents: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      level: z.number(),
    })
  ).optional().nullable(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  canonicalUrl: z.string().optional().nullable(),
  focusKeyword: z.string().optional().nullable(),
  secondaryKeywords: z.array(z.string()).optional().nullable(),
  robotsIndex: z.boolean().optional(),
  robotsFollow: z.boolean().optional(),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  twitterTitle: z.string().optional().nullable(),
  twitterDescription: z.string().optional().nullable(),
  twitterImage: z.string().optional().nullable(),
  structuredDataType: z.string().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

