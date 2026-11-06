import { getDb } from "@/lib/db";
import {
  inquiries,
  leads,
  quotes,
  customers,
  internalNotes,
  adminAuditLogs,
  NewLead,
  NewQuote,
  NewInternalNote,
} from "@/db/schema";
import { eq, desc, and, like, or, count, sql } from "drizzle-orm";
import { dispatchAutomationEvent } from "@/lib/automation/processor";

// ==========================================
// Inquiries Management
// ==========================================

export async function getInquiries(filters?: {
  status?: string;
  inquiryType?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const db = getDb();
  let query = db.select().from(inquiries);

  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(inquiries.status, filters.status));
  }
  if (filters?.inquiryType) {
    conditions.push(eq(inquiries.inquiryType, filters.inquiryType));
  }
  if (filters?.search) {
    const s = `%${filters.search.toLowerCase()}%`;
    conditions.push(
      or(
        like(sql`lower(${inquiries.fullName})`, s),
        like(sql`lower(${inquiries.email})`, s),
        like(sql`lower(${inquiries.referenceCode})`, s),
        like(sql`lower(${inquiries.companyName})`, s)
      )
    );
  }

  if (conditions.length > 0) {
    // @ts-expect-error drizzle conditional where
    query = query.where(and(...conditions));
  }

  const limit = filters?.limit ?? 50;
  const offset = filters?.offset ?? 0;
  const rows = await query.orderBy(desc(inquiries.createdAt)).limit(limit).offset(offset);
  return rows;
}

export async function getInquiryById(id: string) {
  const db = getDb();
  const rows = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updateInquiryStatus(id: string, status: string, notes?: string) {
  const db = getDb();
  await db
    .update(inquiries)
    .set({
      status,
      notes: notes ?? undefined,
      updatedAt: new Date(),
    })
    .where(eq(inquiries.id, id));

  // If status is marked 'contacted', dispatch lead event if associated lead exists
  const associatedLead = await db.select().from(leads).where(eq(leads.inquiryId, id)).limit(1);
  if (associatedLead[0] && status === "contacted" && associatedLead[0].stage === "new") {
    await updateLeadStage(associatedLead[0].id, "contacted");
  }
}

// ==========================================
// Leads Pipeline
// ==========================================

export async function getLeads(filters?: { stage?: string; priority?: string; search?: string }) {
  const db = getDb();
  let query = db.select().from(leads);

  const conditions = [];
  if (filters?.stage) {
    conditions.push(eq(leads.stage, filters.stage));
  }
  if (filters?.priority) {
    conditions.push(eq(leads.priority, filters.priority));
  }
  if (filters?.search) {
    const s = `%${filters.search.toLowerCase()}%`;
    conditions.push(like(sql`lower(${leads.title})`, s));
  }

  if (conditions.length > 0) {
    // @ts-expect-error drizzle conditional where
    query = query.where(and(...conditions));
  }

  const rows = await query.orderBy(desc(leads.createdAt));
  return rows;
}

export async function getLeadById(id: string) {
  const db = getDb();
  const rows = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createLead(data: Partial<NewLead> & { title: string }) {
  const db = getDb();
  const id = data.id ?? `lead_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
  const record: NewLead = {
    ...data,
    id,
    stage: data.stage ?? "new",
    priority: data.priority ?? "medium",
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  };
  await db.insert(leads).values(record);
  return record;
}

export async function updateLeadStage(id: string, stage: string) {
  const db = getDb();
  const lead = await getLeadById(id);
  if (!lead) return;

  const previousStage = lead.stage;
  await db
    .update(leads)
    .set({
      stage,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, id));

  // Trigger automation event
  await dispatchAutomationEvent("lead.stage_changed", {
    leadId: id,
    title: lead.title,
    previousStage,
    newStage: stage,
  });
}

export async function updateLead(id: string, data: Partial<NewLead>) {
  const db = getDb();
  await db
    .update(leads)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, id));
}

// ==========================================
// Quotes Management
// ==========================================

export function generateQuoteNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PL-Q-2026-${random}`;
}

export async function getQuotes(filters?: { status?: string; search?: string }) {
  const db = getDb();
  let query = db.select().from(quotes);

  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(quotes.status, filters.status));
  }
  if (filters?.search) {
    const s = `%${filters.search.toLowerCase()}%`;
    conditions.push(
      or(
        like(sql`lower(${quotes.quoteNumber})`, s),
        like(sql`lower(${quotes.clientName})`, s),
        like(sql`lower(${quotes.clientEmail})`, s)
      )
    );
  }

  if (conditions.length > 0) {
    // @ts-expect-error drizzle conditional where
    query = query.where(and(...conditions));
  }

  const rows = await query.orderBy(desc(quotes.createdAt));
  return rows;
}

export async function getQuoteById(id: string) {
  const db = getDb();
  const rows = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createQuote(
  data: Partial<NewQuote> & {
    clientName: string;
    clientEmail: string;
    totalBdt: number;
    lineItems?: { description: string; amountBdt: number; amountUsd?: number; quantity?: number }[];
  }
) {
  const db = getDb();
  const id = data.id ?? `qte_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
  const quoteNumber = data.quoteNumber ?? generateQuoteNumber();
  const items = data.items ?? data.lineItems ?? [];
  const validUntil = data.validUntil ?? new Date(Date.now() + 14 * 86400000);

  const newRecord: NewQuote = {
    ...data,
    id,
    quoteNumber,
    items: items as { description: string; amountBdt: number; amountUsd?: number }[],
    validUntil,
    status: data.status ?? "draft",
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  };
  await db.insert(quotes).values(newRecord);

  // Trigger quote automation
  await dispatchAutomationEvent("quote.created", {
    quoteId: id,
    quoteNumber,
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    totalBdt: data.totalBdt,
  });

  return newRecord;
}

export async function updateQuoteStatus(id: string, status: string) {
  const db = getDb();
  await db
    .update(quotes)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(quotes.id, id));
}

// ==========================================
// Customers
// ==========================================

export async function getCustomers(filters?: { search?: string }) {
  const db = getDb();
  if (filters?.search) {
    const s = `%${filters.search.toLowerCase()}%`;
    return await db
      .select()
      .from(customers)
      .where(
        or(
          like(sql`lower(${customers.fullName})`, s),
          like(sql`lower(${customers.email})`, s),
          like(sql`lower(${customers.companyName})`, s)
        )
      )
      .orderBy(desc(customers.createdAt));
  }
  return await db.select().from(customers).orderBy(desc(customers.createdAt));
}

export async function getCustomerById(id: string) {
  const db = getDb();
  const rows = await db.select().from(customers).where(eq(customers.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function upsertCustomer(data: {
  id?: string;
  fullName?: string;
  name?: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  company?: string | null;
  status?: string;
  country?: string;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  const db = getDb();
  const fullName = data.fullName || data.name || "Unknown Customer";
  const companyName = data.companyName || data.company || null;
  const email = data.email.toLowerCase();

  const existing = await db.select().from(customers).where(eq(customers.email, email)).limit(1);
  if (existing.length > 0) {
    await db
      .update(customers)
      .set({
        fullName,
        phone: data.phone ?? existing[0].phone,
        companyName: companyName ?? existing[0].companyName,
        status: data.status ?? existing[0].status,
        updatedAt: new Date(),
      })
      .where(eq(customers.id, existing[0].id));
    return { ...existing[0], fullName, companyName };
  } else {
    const customerId = data.id ?? `cst_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
    const newCustomer = {
      id: customerId,
      fullName,
      email,
      phone: data.phone ?? null,
      companyName,
      status: data.status ?? "lead",
      country: data.country ?? "Bangladesh",
      notes: data.notes ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(customers).values(newCustomer);
    return newCustomer;
  }
}

// ==========================================
// Internal Notes
// ==========================================

export async function getInternalNotes(entityType: string, entityId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(internalNotes)
    .where(and(eq(internalNotes.entityType, entityType), eq(internalNotes.entityId, entityId)))
    .orderBy(desc(internalNotes.createdAt));
  return rows;
}

export async function addInternalNote(data: NewInternalNote) {
  const db = getDb();
  await db.insert(internalNotes).values(data);
  return data;
}

// ==========================================
// CRM Dashboard Aggregation
// ==========================================

export async function getCrmDashboardMetrics() {
  const db = getDb();

  const [inquiryTotal] = await db.select({ count: count() }).from(inquiries);
  const [inquiryNew] = await db.select({ count: count() }).from(inquiries).where(eq(inquiries.status, "new"));

  const openStages = ["new", "reviewing", "contacted", "qualified", "proposal", "negotiation"];
  const allLeads = await db.select().from(leads);
  const openLeads = allLeads.filter((l) => openStages.includes(l.stage));
  const pipelineValueBdt = openLeads.reduce((acc, l) => acc + (l.estimatedValueBdt ?? 0), 0);

  const [quotesTotal] = await db.select({ count: count() }).from(quotes);
  const [quotesPending] = await db.select({ count: count() }).from(quotes).where(eq(quotes.status, "sent"));

  const recentInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(5);
  const recentAudit = await db.select().from(adminAuditLogs).orderBy(desc(adminAuditLogs.createdAt)).limit(6);

  return {
    totalInquiries: Number(inquiryTotal?.count ?? 0),
    newInquiries: Number(inquiryNew?.count ?? 0),
    openLeadsCount: openLeads.length,
    pipelineValueBdt,
    totalQuotes: Number(quotesTotal?.count ?? 0),
    pendingQuotes: Number(quotesPending?.count ?? 0),
    recentInquiries,
    recentAudit,
  };
}
