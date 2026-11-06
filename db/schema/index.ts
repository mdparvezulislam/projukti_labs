import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const pocRecords = sqliteTable("poc_records", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull().default("pending"),
  metadata: text("metadata", { mode: "json" }).$type<{ note?: string; tags?: string[] }>(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const systemHealthChecks = sqliteTable("system_health_checks", {
  id: text("id").primaryKey(),
  serviceName: text("service_name").notNull(),
  isHealthy: integer("is_healthy", { mode: "boolean" }).notNull().default(true),
  checkedAt: integer("checked_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  referenceCode: text("reference_code").notNull().unique(),
  inquiryType: text("inquiry_type").notNull(), // 'quote' | 'contact' | 'consultation' | 'maintenance'
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phoneWhatsapp: text("phone_whatsapp"),
  companyName: text("company_name"),
  country: text("country"),
  serviceId: text("service_id"),
  packageId: text("package_id"),
  budgetRange: text("budget_range"),
  currency: text("currency").notNull().default("BDT"),
  timelinePreference: text("timeline_preference"),
  projectBrief: text("project_brief").notNull(),
  sourcePage: text("source_page"),
  utmJson: text("utm_json"),
  ipHash: text("ip_hash"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  inquiryId: text("inquiry_id"),
  title: text("title").notNull(),
  stage: text("stage").notNull().default("new"), // 'new' | 'reviewing' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  priority: text("priority").notNull().default("medium"),
  estimatedValueBdt: integer("estimated_value_bdt"),
  estimatedValueUsd: integer("estimated_value_usd"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type PocRecord = typeof pocRecords.$inferSelect;
export type NewPocRecord = typeof pocRecords.$inferInsert;
export type SystemHealthCheck = typeof systemHealthChecks.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
