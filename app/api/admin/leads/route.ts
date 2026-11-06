import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getLeads, getLeadById, createLead, updateLeadStage, updateLead } from "@/lib/crm";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const stage = searchParams.get("stage") || undefined;
    const priority = searchParams.get("priority") || undefined;
    const search = searchParams.get("search") || undefined;

    const list = await getLeads({ stage, priority, search });
    return apiSuccess({ leads: list });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "লিড তালিকা লোড করা যায়নি।", 500);
  }
}

const CreateLeadSchema = z.object({
  title: z.string().min(2),
  stage: z.enum(["new", "reviewing", "contacted", "qualified", "proposal", "negotiation", "won", "lost"]).default("new"),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  estimatedValueBdt: z.number().optional().nullable(),
  estimatedValueUsd: z.number().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "support"]);
    const body = await req.json();
    const parsed = CreateLeadSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ ইনপুট ডাটা।", 400);
    }

    const leadId = `lead_${crypto.randomUUID()}`;
    const newLead = await createLead({
      id: leadId,
      ...parsed.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "create_lead",
      resourceType: "lead",
      resourceId: leadId,
      details: { title: parsed.data.title },
      req,
    });

    return apiSuccess({ lead: newLead }, 201);
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "লিড তৈরি করা সম্ভব হয়নি।", 500);
  }
}

const PatchLeadSchema = z.object({
  id: z.string(),
  stage: z.enum(["new", "reviewing", "contacted", "qualified", "proposal", "negotiation", "won", "lost"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  estimatedValueBdt: z.number().optional().nullable(),
});

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "support"]);
    const body = await req.json();
    const parsed = PatchLeadSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ ইনপুট ডাটা।", 400);
    }

    const { id, stage, priority, estimatedValueBdt } = parsed.data;
    const existing = await getLeadById(id);
    if (!existing) {
      return apiError("NOT_FOUND", "লিড পাওয়া যায়নি।", 404);
    }

    if (stage && stage !== existing.stage) {
      await updateLeadStage(id, stage);
    }

    if (priority !== undefined || estimatedValueBdt !== undefined) {
      await updateLead(id, {
        priority: priority ?? existing.priority,
        estimatedValueBdt: estimatedValueBdt ?? existing.estimatedValueBdt,
      });
    }

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "update_lead",
      resourceType: "lead",
      resourceId: id,
      details: { previousStage: existing.stage, newStage: stage ?? existing.stage },
      req,
    });

    return apiSuccess({ success: true, message: "লিড আপডেট করা হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "লিড আপডেট ব্যর্থ হয়েছে।", 500);
  }
}

