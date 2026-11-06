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

export type PocRecord = typeof pocRecords.$inferSelect;
export type NewPocRecord = typeof pocRecords.$inferInsert;
export type SystemHealthCheck = typeof systemHealthChecks.$inferSelect;

