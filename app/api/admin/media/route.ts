import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import { mediaAssets, blogPosts, portfolioProjects } from "@/db/schema";
import { getCloudflareBindings } from "@/lib/env";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { desc, like, eq, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const db = getDb();
    const assets = search
      ? await db
          .select()
          .from(mediaAssets)
          .where(like(mediaAssets.fileName, `%${search}%`))
          .orderBy(desc(mediaAssets.createdAt))
          .limit(50)
      : await db
          .select()
          .from(mediaAssets)
          .orderBy(desc(mediaAssets.createdAt))
          .limit(50);
    return apiSuccess({ assets });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "মিডিয়া লোড করা যায়নি।", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const bindings = getCloudflareBindings();
    const contentType = req.headers.get("content-type") || "";

    // Check if multipart form upload
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const altText = (formData.get("altText") as string) || "";
      const category = (formData.get("category") as string) || "blog";

      if (!file) {
        return apiError("BAD_REQUEST", "কোনো ফাইল সিলেক্ট করা হয়নি।", 400);
      }

      // Check R2 binding
      const r2Bucket = bindings.R2_BUCKET as { put?: (key: string, data: ArrayBuffer | Uint8Array, opts?: unknown) => Promise<unknown> } | undefined;

      if (!r2Bucket || typeof r2Bucket.put !== "function") {
        return apiSuccess({
          configured: false,
          message: "Cloudflare R2 Bucket binding is not active in this runtime. Direct image uploads require active R2 credentials. Please use the 'Image URL' option.",
        });
      }

      const buffer = await file.arrayBuffer();
      const ext = file.name.split(".").pop() || "jpg";
      const fileKey = `media/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

      await r2Bucket.put(fileKey, buffer, {
        httpMetadata: { contentType: file.type },
      });

      const publicUrl = `/api/media/${fileKey}`;
      const db = getDb();
      const assetId = `med_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      await db.insert(mediaAssets).values({
        id: assetId,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        url: publicUrl,
        altText,
        category,
        uploadedBy: auth.user.email,
        createdAt: new Date(),
      });

      await logAdminAudit({
        userId: auth.user.id,
        userEmail: auth.user.email,
        action: "upload_media_asset",
        resourceType: "settings",
        resourceId: assetId,
        details: { fileName: file.name, size: file.size, mimeType: file.type },
        req,
      });

      return apiSuccess({
        configured: true,
        asset: {
          id: assetId,
          url: publicUrl,
          fileName: file.name,
          altText,
        },
      });
    }

    // Direct JSON URL registration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (await req.json()) as any;
    const { url, fileName, altText, fileSize, mimeType, category } = body;

    if (!url) {
      return apiError("BAD_REQUEST", "ইমেজ ইউআরএল আবশ্যক।", 400);
    }

    const db = getDb();
    const assetId = `med_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const newAsset = {
      id: assetId,
      fileName: fileName || url.split("/").pop() || "image.jpg",
      fileSize: fileSize || 0,
      mimeType: mimeType || "image/jpeg",
      url,
      altText: altText || "",
      category: category || "blog",
      uploadedBy: auth.user.email,
      createdAt: new Date(),
    };

    await db.insert(mediaAssets).values(newAsset);

    return apiSuccess({
      configured: true,
      asset: newAsset,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "মিডিয়া আপলোড ব্যর্থ হয়েছে।", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin"]);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const force = searchParams.get("force") === "true";

    if (!id) {
      return apiError("BAD_REQUEST", "মিডিয়া আইডি প্রদান করা আবশ্যক।", 400);
    }

    const db = getDb();
    const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
    if (!asset) {
      return apiError("NOT_FOUND", "মিডিয়া রেকর্ড পাওয়া যায়নি।", 404);
    }

    // Check references in blog posts or portfolio if not forced
    if (!force) {
      const referencedPosts = await db
        .select({ id: blogPosts.id, title: blogPosts.title })
        .from(blogPosts)
        .where(or(eq(blogPosts.coverImage, asset.url), eq(blogPosts.ogImage, asset.url)))
        .limit(1);

      if (referencedPosts.length > 0) {
        return apiError(
          "CONFLICT",
          `এই ছবিটি "${referencedPosts[0].title}" ব্লগে ব্যবহৃত হচ্ছে। নিশ্চিত হয়ে মুছে ফেলতে Force Delete সিলেক্ট করুন।`,
          409
        );
      }

      const referencedPortfolio = await db
        .select({ id: portfolioProjects.id, title: portfolioProjects.title })
        .from(portfolioProjects)
        .where(eq(portfolioProjects.linkUrl, asset.url))
        .limit(1);

      if (referencedPortfolio.length > 0) {
        return apiError(
          "CONFLICT",
          `এই ছবিটি "${referencedPortfolio[0].title}" পোর্টফোলিও প্রজেক্টে ব্যবহৃত হচ্ছে। নিশ্চিত হয়ে মুছে ফেলতে Force Delete সিলেক্ট করুন।`,
          409
        );
      }
    }

    // Attempt R2 deletion if key is in /api/media/...
    if (asset.url.startsWith("/api/media/")) {
      const bindings = getCloudflareBindings();
      const r2Bucket = bindings.R2_BUCKET as { delete?: (key: string) => Promise<unknown> } | undefined;
      const fileKey = asset.url.replace("/api/media/", "");
      if (r2Bucket && typeof r2Bucket.delete === "function") {
        try {
          await r2Bucket.delete(fileKey);
        } catch {
          // Continue deleting metadata
        }
      }
    }

    await db.delete(mediaAssets).where(eq(mediaAssets.id, id));

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "delete_media_asset",
      resourceType: "media",
      resourceId: id,
      details: { fileName: asset.fileName, url: asset.url },
      req,
    });

    return apiSuccess({ success: true, message: "মিডিয়া ফাইল সফলভাবে ডিলিট করা হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    if (err instanceof Error && err.message === "FORBIDDEN") {
      return apiError("FORBIDDEN", "শুধুমাত্র Owner এবং Admin মিডিয়া মুছে ফেলতে পারেন।", 403);
    }
    return apiError("SERVER_ERROR", "মিডিয়া ডিলিট ব্যর্থ হয়েছে।", 500);
  }
}
