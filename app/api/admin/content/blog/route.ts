import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getCmsBlogPosts, upsertCmsBlogPost, deleteCmsBlogPost } from "@/lib/cms";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;

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
  excerpt: z.string().min(10),
  content: z.string().min(20),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional().nullable(),
  status: z.enum(["draft", "published", "scheduled", "archived"]).default("draft"),
  isFeatured: z.boolean().default(false),
  readTime: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  scheduledAt: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const body = await req.json();
    const parsed = UpsertBlogSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ ব্লগ পোস্ট তথ্য।", 400);
    }

    const { scheduledAt, ...data } = parsed.data;
    const now = new Date();
    const isPublishing = data.status === "published";

    await upsertCmsBlogPost({
      ...data,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      publishedAt: isPublishing ? now : null,
      createdAt: now,
      updatedAt: now,
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "upsert_blog_post",
      resourceType: "blog",
      resourceId: data.id,
      details: { slug: data.slug, title: data.title, status: data.status },
      req,
    });

    return apiSuccess({ success: true, message: "ব্লগ পোস্ট সফলভাবে সংরক্ষণ করা হয়েছে।" });
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

