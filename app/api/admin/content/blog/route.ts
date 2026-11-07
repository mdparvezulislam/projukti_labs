import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import {
  getCmsBlogPosts,
  getCmsBlogPostBySlug,
  upsertCmsBlogPost,
  deleteCmsBlogPost,
  getCmsCategories,
  saveCmsPostRevision,
  getCmsPostRevisions,
} from "@/lib/cms";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { sanitizeHtml } from "@/lib/cms/sanitizer";
import { extractArticleMetadata } from "@/lib/cms/blog-extractor";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const slug = searchParams.get("slug");
    const getCategories = searchParams.get("categories");
    const revisionsFor = searchParams.get("revisionsFor");

    if (getCategories === "true") {
      const categories = await getCmsCategories();
      return apiSuccess({ categories });
    }

    if (revisionsFor) {
      const revisions = await getCmsPostRevisions(revisionsFor);
      return apiSuccess({ revisions });
    }

    if (slug) {
      const post = await getCmsBlogPostBySlug(slug);
      return apiSuccess({ post });
    }

    const posts = await getCmsBlogPosts(status);
    return apiSuccess({ posts });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "ব্লগ পোস্ট লোড করা যায়নি।", 500);
  }
}

const UpsertBlogSchema = z.object({
  id: z.string(),
  slug: z.string().min(2),
  title: z.string().min(3),
  subtitle: z.string().optional().nullable(),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  contentFormat: z.enum(["html", "markdown"]).default("markdown"),
  category: z.string(),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  authorName: z.string().optional().nullable(),
  authorRole: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  imageTitle: z.string().optional().nullable(),
  imageCaption: z.string().optional().nullable(),
  imageCredit: z.string().optional().nullable(),
  status: z.enum(["draft", "published", "scheduled", "archived"]).default("draft"),
  isFeatured: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  allowComments: z.boolean().default(false),
  editorialNotes: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  canonicalUrl: z.string().optional().nullable(),
  focusKeyword: z.string().optional().nullable(),
  secondaryKeywords: z.array(z.string()).optional().nullable(),
  robotsIndex: z.boolean().default(true),
  robotsFollow: z.boolean().default(true),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  twitterTitle: z.string().optional().nullable(),
  twitterDescription: z.string().optional().nullable(),
  twitterImage: z.string().optional().nullable(),
  scheduledAt: z.string().optional().nullable(),
  revisionNote: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const body = await req.json();
    const parsed = UpsertBlogSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ ব্লগ পোস্ট তথ্য: " + JSON.stringify(parsed.error.flatten().fieldErrors), 400);
    }

    const { scheduledAt, revisionNote, ...data } = parsed.data;
    const now = new Date();
    const isPublishing = data.status === "published";

    // 1. Sanitize content if HTML
    const cleanContent = data.contentFormat === "html" ? sanitizeHtml(data.content) : data.content;

    // 2. Derive deterministic server metrics
    const analysis = extractArticleMetadata(cleanContent, data.contentFormat);

    const safePostData = {
      ...data,
      content: cleanContent,
      contentPlainText: analysis.plainText,
      wordCount: analysis.wordCount,
      characterCount: analysis.characterCount,
      readingTimeMinutes: analysis.readingTimeMinutes,
      headingCount: analysis.headingCount,
      paragraphCount: analysis.paragraphCount,
      tableOfContents: analysis.tableOfContents,
      lastContentAnalysisAt: now,
      lastSavedAt: now,
      readTime: `${analysis.readingTimeMinutes} min read`,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      publishedAt: isPublishing ? now : null,
      createdAt: now,
      updatedAt: now,
    };

    // 3. Persist to D1
    await upsertCmsBlogPost(safePostData);

    // 4. Save post revision
    await saveCmsPostRevision({
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      postId: data.id,
      title: data.title,
      subtitle: data.subtitle,
      excerpt: data.excerpt,
      content: cleanContent,
      contentFormat: data.contentFormat,
      authorId: auth.user.id,
      revisionNote: revisionNote || `Saved by ${auth.user.name} (${data.status})`,
      createdAt: now,
    });

    // 5. Audit Log
    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: isPublishing ? "publish_blog_post" : "upsert_blog_post",
      resourceType: "blog",
      resourceId: data.id,
      details: {
        slug: data.slug,
        title: data.title,
        status: data.status,
        format: data.contentFormat,
        wordCount: analysis.wordCount,
      },
      req,
    });

    return apiSuccess({
      success: true,
      message: isPublishing ? "ব্লগ পোস্ট সফলভাবে প্রকাশিত হয়েছে।" : "ব্লগ পোস্ট ড্রাফট সংরক্ষিত হয়েছে।",
      data: safePostData,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "ব্লগ পোস্ট সংরক্ষণ করা যায়নি।", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin"]);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return apiError("BAD_REQUEST", "পোস্ট আইডি দেওয়া হয়নি।", 400);
    }

    await deleteCmsBlogPost(id);
    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "delete_blog_post",
      resourceType: "blog",
      resourceId: id,
      req,
    });

    return apiSuccess({ success: true, message: "ব্লগ পোস্ট মুছে ফেলা হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "ব্লগ পোস্ট মোছা যায়নি।", 500);
  }
}
