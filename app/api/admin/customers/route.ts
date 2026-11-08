import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getCustomers, upsertCustomer, getCustomerDetails, updateCustomer } from "@/lib/crm";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const search = searchParams.get("search") || undefined;

    if (id) {
      const details = await getCustomerDetails(id);
      if (!details) {
        return apiError("NOT_FOUND", "গ্রাহক রেকর্ড পাওয়া যায়নি।", 404);
      }
      return apiSuccess(details);
    }

    const list = await getCustomers({ search });
    return apiSuccess({ customers: list });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "গ্রাহক তালিকা লোড করা যায়নি।", 500);
  }
}

const CreateCustomerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  companyName: z.string().optional().nullable(),
  country: z.string().default("Bangladesh"),
  status: z.enum(["lead", "client", "inactive"]).default("client"),
  notes: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "support"]);
    const body = await req.json();
    const parsed = CreateCustomerSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ গ্রাহক তথ্য।", 400);
    }

    const customerId = `cst_${crypto.randomUUID()}`;
    const newCustomer = await upsertCustomer({
      id: customerId,
      ...parsed.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "upsert_customer",
      resourceType: "customer",
      resourceId: customerId,
      details: { email: parsed.data.email, name: parsed.data.fullName },
      req,
    });

    return apiSuccess({ customer: newCustomer }, 201);
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "গ্রাহক তৈরি বা আপডেট ব্যর্থ হয়েছে।", 500);
  }
}

const UpdateCustomerSchema = z.object({
  id: z.string(),
  fullName: z.string().min(2).optional(),
  phone: z.string().optional().nullable(),
  companyName: z.string().optional().nullable(),
  status: z.enum(["lead", "client", "inactive"]).optional(),
  notes: z.string().optional().nullable(),
});

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "support"]);
    const body = await req.json();
    const parsed = UpdateCustomerSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ গ্রাহক আপডেট তথ্য।", 400);
    }

    const { id, ...data } = parsed.data;
    const updated = await updateCustomer(id, data);
    if (!updated) {
      return apiError("NOT_FOUND", "গ্রাহক রেকর্ড পাওয়া যায়নি।", 404);
    }

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "update_customer",
      resourceType: "customer",
      resourceId: id,
      details: { changes: data },
      req,
    });

    return apiSuccess({ customer: updated, message: "গ্রাহক তথ্য সফলভাবে আপডেট হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    if (err instanceof Error && err.message === "FORBIDDEN") {
      return apiError("FORBIDDEN", "এই অ্যাকশনের জন্য পর্যাপ্ত অনুমতি নেই।", 403);
    }
    return apiError("SERVER_ERROR", "গ্রাহক আপডেট ব্যর্থ হয়েছে।", 500);
  }
}

