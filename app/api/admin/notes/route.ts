import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getInternalNotes, addInternalNote } from "@/lib/crm";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const entityType = searchParams.get("entityType");
    const entityId = searchParams.get("entityId");

    if (!entityType || !entityId) {
      return apiError("VALIDATION_ERROR", "entityType ও entityId দেওয়া আবশ্যক।", 400);
    }

    const notes = await getInternalNotes(entityType, entityId);
    return apiSuccess({ notes });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "নোট লোড করা যায়নি।", 500);
  }
}

const AddNoteSchema = z.object({
  entityType: z.enum(["inquiry", "lead", "quote", "customer"]),
  entityId: z.string().min(1),
  content: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor", "support"]);
    const body = await req.json();
    const parsed = AddNoteSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "নোটের কন্টেন্ট প্রদান করুন।", 400);
    }

    const noteId = `not_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
    const newNote = {
      id: noteId,
      entityType: parsed.data.entityType,
      entityId: parsed.data.entityId,
      authorId: auth.user.id,
      authorName: auth.user.name,
      content: parsed.data.content,
      createdAt: new Date(),
    };

    await addInternalNote(newNote);

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "add_internal_note",
      resourceType: parsed.data.entityType,
      resourceId: parsed.data.entityId,
      details: { noteId, authorName: auth.user.name },
      req,
    });

    return apiSuccess({ note: newNote, message: "নোট সফলভাবে যুক্ত হয়েছে।" }, 201);
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    if (err instanceof Error && err.message === "FORBIDDEN") {
      return apiError("FORBIDDEN", "এই অ্যাকশনের জন্য পর্যাপ্ত অনুমতি নেই।", 403);
    }
    return apiError("SERVER_ERROR", "নোট যুক্ত করা যায়নি।", 500);
  }
}
