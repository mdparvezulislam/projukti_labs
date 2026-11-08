import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuoteStatus,
  upsertCustomer,
  updateLeadStage,
} from "@/lib/crm";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const list = await getQuotes({ status, search });
    return apiSuccess({ quotes: list });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "কোটেশন তালিকা লোড করা যায়নি।", 500);
  }
}

const CreateQuoteSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional().nullable(),
  clientCompany: z.string().optional().nullable(),
  serviceId: z.string().optional().nullable(),
  packageId: z.string().optional().nullable(),
  items: z.array(
    z.object({
      description: z.string().min(1),
      amountBdt: z.number().positive(),
      amountUsd: z.number().positive().optional(),
    })
  ).min(1),
  totalBdt: z.number().positive(),
  totalUsd: z.number().positive().optional().nullable(),
  validDays: z.number().int().min(1).default(14),
  notes: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "support"]);
    const body = await req.json();
    const parsed = CreateQuoteSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ কোটেশন তথ্য।", 400);
    }

    const { validDays, ...data } = parsed.data;
    const quoteId = `qte_${crypto.randomUUID()}`;
    const validUntil = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000);

    const newQuote = await createQuote({
      id: quoteId,
      ...data,
      status: "draft",
      validUntil,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "create_quote",
      resourceType: "quote",
      resourceId: quoteId,
      details: { quoteNumber: newQuote.quoteNumber, clientName: data.clientName, totalBdt: data.totalBdt },
      req,
    });

    return apiSuccess({ quote: newQuote }, 201);
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "কোটেশন তৈরি করা সম্ভব হয়নি।", 500);
  }
}

const PatchQuoteSchema = z.object({
  id: z.string(),
  status: z.enum(["draft", "sent", "accepted", "rejected", "expired"]),
});

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "support"]);
    const body = await req.json();
    const parsed = PatchQuoteSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ কোটেশন স্ট্যাটাস।", 400);
    }

    const { id, status } = parsed.data;
    const existing = await getQuoteById(id);
    if (!existing) {
      return apiError("NOT_FOUND", "কোটেশন পাওয়া যায়নি।", 404);
    }

    await updateQuoteStatus(id, status);

    // If accepted, auto-promote client to verified Customer and Lead to 'won'
    if (status === "accepted") {
      try {
        await upsertCustomer({
          fullName: existing.clientName,
          email: existing.clientEmail,
          phone: existing.clientPhone,
          companyName: existing.clientCompany,
          status: "client",
        });

        if (existing.leadId) {
          await updateLeadStage(existing.leadId, "won");
        }
      } catch {
        // Progression error should not block quote status update
      }
    }

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "update_quote_status",
      resourceType: "quote",
      resourceId: id,
      details: { previousStatus: existing.status, newStatus: status, quoteNumber: existing.quoteNumber },
      req,
    });

    return apiSuccess({ success: true, message: "কোটেশন স্ট্যাটাস আপডেট হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "কোটেশন আপডেট ব্যর্থ হয়েছে।", 500);
  }
}

