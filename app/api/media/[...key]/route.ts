import { NextRequest, NextResponse } from "next/server";
import { getCloudflareBindings } from "@/lib/env";

interface RouteParams {
  params: Promise<{ key: string[] }>;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const keyArray = resolvedParams?.key;

    if (!keyArray || keyArray.length === 0) {
      return new NextResponse("Key parameter missing", { status: 400 });
    }

    const key = keyArray.join("/");

    // Path traversal prevention: disallow dots or escapes
    if (key.includes("..") || key.startsWith("/") || key.includes("\\")) {
      return new NextResponse("Invalid media key", { status: 400 });
    }

    const bindings = getCloudflareBindings();
    const r2Bucket = bindings.R2_BUCKET as {
      get?: (key: string) => Promise<{
        body: ReadableStream;
        size: number;
        httpEtag: string;
        httpMetadata?: {
          contentType?: string;
          cacheControl?: string;
        };
      } | null>;
    } | undefined;

    if (!r2Bucket || typeof r2Bucket.get !== "function") {
      return new NextResponse("R2 Storage binding not configured", { status: 503 });
    }

    const object = await r2Bucket.get(key);
    if (!object) {
      return new NextResponse("Media asset not found", { status: 404 });
    }

    const contentType = object.httpMetadata?.contentType || "application/octet-stream";
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Length", object.size.toString());
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("ETag", object.httpEtag);
    headers.set("X-Content-Type-Options", "nosniff");

    return new Response(object.body as unknown as BodyInit, {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("[Media Serving Error]:", err);
    return new NextResponse("Internal server error serving media", { status: 500 });
  }
}

export async function HEAD(req: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const key = resolvedParams?.key?.join("/");

    if (!key || key.includes("..")) {
      return new NextResponse(null, { status: 400 });
    }

    const bindings = getCloudflareBindings();
    const r2Bucket = bindings.R2_BUCKET as {
      get?: (key: string) => Promise<{
        size: number;
        httpEtag: string;
        httpMetadata?: { contentType?: string };
      } | null>;
    } | undefined;

    if (!r2Bucket || typeof r2Bucket.get !== "function") {
      return new NextResponse(null, { status: 503 });
    }

    const object = await r2Bucket.get(key);
    if (!object) {
      return new NextResponse(null, { status: 404 });
    }

    const headers = new Headers();
    headers.set("Content-Type", object.httpMetadata?.contentType || "application/octet-stream");
    headers.set("Content-Length", object.size.toString());
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("ETag", object.httpEtag);

    return new Response(null, { status: 200, headers });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
