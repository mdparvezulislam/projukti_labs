import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getCustomers, upsertCustomer } from "@/lib/crm";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;

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

