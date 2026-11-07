import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ==========================================
// 1. Foundation & Legacy POC Entities
// ==========================================

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

// ==========================================
// 2. Authentication, Users & Audit
// ==========================================

export const adminUsers = sqliteTable("admin_users", {
  id: text("id").primaryKey(), // 'usr_...'
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  passwordSalt: text("password_salt").notNull(),
  role: text("role").notNull().default("editor"), // 'owner' | 'admin' | 'editor' | 'support'
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  lastLoginAt: integer("last_login_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const adminSessions = sqliteTable("admin_sessions", {
  id: text("id").primaryKey(), // 'ses_...'
  userId: text("user_id").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const adminAuditLogs = sqliteTable("admin_audit_logs", {
  id: text("id").primaryKey(), // 'aud_...'
  userId: text("user_id"),
  userEmail: text("user_email"),
  action: text("action").notNull(), // 'login' | 'logout' | 'create' | 'update' | 'delete' | 'publish'
  resourceType: text("resource_type").notNull(), // 'page' | 'blog' | 'service' | 'inquiry' | 'quote' | 'settings' | 'user'
  resourceId: text("resource_id"),
  details: text("details", { mode: "json" }).$type<Record<string, unknown>>(),
  ipHash: text("ip_hash"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// 3. CMS & Website Content
// ==========================================

export const siteSettings = sqliteTable("site_settings", {
  id: text("id").primaryKey(), // 'primary' or key-based
  key: text("key").notNull().unique(),
  value: text("value", { mode: "json" }).notNull().$type<Record<string, unknown>>(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const pageSections = sqliteTable("page_sections", {
  id: text("id").primaryKey(), // 'sec_...'
  pageSlug: text("page_slug").notNull(), // 'home' | 'about' | 'founder' | 'contact'
  sectionKey: text("section_key").notNull(), // 'hero' | 'metrics' | 'features' | 'process' | 'cta'
  title: text("title"),
  subtitle: text("subtitle"),
  content: text("content", { mode: "json" }).$type<Record<string, unknown>>(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const services = sqliteTable("services", {
  id: text("id").primaryKey(), // 'srv_...'
  slug: text("slug").notNull().unique(),
  categorySlug: text("category_slug").notNull(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  description: text("description").notNull(),
  isFlagship: integer("is_flagship", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("active"), // 'active' | 'coming_soon' | 'draft'
  sortOrder: integer("sort_order").notNull().default(0),
  deliverables: text("deliverables", { mode: "json" }).$type<string[]>(),
  exclusions: text("exclusions", { mode: "json" }).$type<string[]>(),
  technicalHighlights: text("technical_highlights", { mode: "json" }).$type<string[]>(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const servicePackages = sqliteTable("service_packages", {
  id: text("id").primaryKey(), // 'pkg_...'
  serviceId: text("service_id").notNull(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  priceBdt: integer("price_bdt"),
  priceUsd: integer("price_usd"),
  billingPeriod: text("billing_period").default("one-time"), // 'one-time' | 'monthly' | 'custom'
  description: text("description").notNull(),
  isPopular: integer("is_popular", { mode: "boolean" }).notNull().default(false),
  slaHours: integer("sla_hours"),
  deliverables: text("deliverables", { mode: "json" }).$type<string[]>(),
  exclusions: text("exclusions", { mode: "json" }).$type<string[]>(),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const blogCategories = sqliteTable("blog_categories", {
  id: text("id").primaryKey(), // 'cat_...'
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const blogTags = sqliteTable("blog_tags", {
  id: text("id").primaryKey(), // 'tag_...'
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(), // 'post_...'
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(), // Markdown or HTML format
  contentFormat: text("content_format").notNull().default("markdown"), // 'markdown' | 'html'
  contentPlainText: text("content_plain_text"),
  category: text("category").notNull(),
  categoryId: text("category_id"),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
  authorId: text("author_id"),
  authorName: text("author_name").default("Md Parvezul Islam"),
  authorRole: text("author_role").default("Principal Software Architect & Founder"),
  coverImage: text("cover_image"),
  imageAlt: text("image_alt"),
  imageTitle: text("image_title"),
  imageCaption: text("image_caption"),
  imageCredit: text("image_credit"),
  imageWidth: integer("image_width"),
  imageHeight: integer("image_height"),
  imageMimeType: text("image_mime_type"),
  status: text("status").notNull().default("draft"), // 'draft' | 'published' | 'scheduled' | 'archived'
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  isPinned: integer("is_pinned", { mode: "boolean" }).notNull().default(false),
  allowComments: integer("allow_comments", { mode: "boolean" }).notNull().default(false),
  editorialNotes: text("editorial_notes"),
  language: text("language").notNull().default("bn"),
  version: integer("version").notNull().default(1),
  readTime: text("read_time"),
  readingTimeMinutes: integer("reading_time_minutes").default(5),
  wordCount: integer("word_count").default(0),
  characterCount: integer("character_count").default(0),
  headingCount: integer("heading_count").default(0),
  paragraphCount: integer("paragraph_count").default(0),
  tableOfContents: text("table_of_contents", { mode: "json" }).$type<{ id: string; text: string; level: number }[]>(),
  lastContentAnalysisAt: integer("last_content_analysis_at", { mode: "timestamp_ms" }),
  lastSavedAt: integer("last_saved_at", { mode: "timestamp_ms" }),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  canonicalUrl: text("canonical_url"),
  focusKeyword: text("focus_keyword"),
  secondaryKeywords: text("secondary_keywords", { mode: "json" }).$type<string[]>(),
  robotsIndex: integer("robots_index", { mode: "boolean" }).notNull().default(true),
  robotsFollow: integer("robots_follow", { mode: "boolean" }).notNull().default(true),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  structuredDataType: text("structured_data_type").default("Article"),
  scheduledAt: integer("scheduled_at", { mode: "timestamp_ms" }),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const blogPostRevisions = sqliteTable("blog_post_revisions", {
  id: text("id").primaryKey(), // 'rev_...'
  postId: text("post_id").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  contentFormat: text("content_format").notNull().default("markdown"),
  authorId: text("author_id"),
  revisionNote: text("revision_note"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const portfolioProjects = sqliteTable("portfolio_projects", {
  id: text("id").primaryKey(), // 'prj_...'
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  badge: text("badge").notNull(),
  projectType: text("project_type").notNull(),
  overview: text("overview").notNull(),
  metrics: text("metrics", { mode: "json" }).$type<{ label: string; value: string }[]>(),
  stack: text("stack", { mode: "json" }).$type<string[]>(),
  deliverables: text("deliverables", { mode: "json" }).$type<string[]>(),
  linkUrl: text("link_url"),
  linkText: text("link_text"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const faqs = sqliteTable("faqs", {
  id: text("id").primaryKey(), // 'faq_...'
  category: text("category").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// 4. CRM & Business Entities
// ==========================================

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
  status: text("status").notNull().default("new"), // 'new' | 'contacted' | 'discussing' | 'quoted' | 'won' | 'cancelled' | 'archived'
  assignedTo: text("assigned_to"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  inquiryId: text("inquiry_id"),
  title: text("title").notNull(),
  stage: text("stage").notNull().default("new"), // 'new' | 'reviewing' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  priority: text("priority").notNull().default("medium"), // 'low' | 'medium' | 'high' | 'urgent'
  estimatedValueBdt: integer("estimated_value_bdt"),
  estimatedValueUsd: integer("estimated_value_usd"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const quotes = sqliteTable("quotes", {
  id: text("id").primaryKey(), // 'qte_...'
  quoteNumber: text("quote_number").notNull().unique(), // 'PL-Q-2026-XXXX'
  leadId: text("lead_id"),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  clientCompany: text("client_company"),
  serviceId: text("service_id"),
  packageId: text("package_id"),
  items: text("items", { mode: "json" })
    .notNull()
    .$type<{ description: string; amountBdt: number; amountUsd?: number }[]>(),
  totalBdt: integer("total_bdt").notNull(),
  totalUsd: integer("total_usd"),
  status: text("status").notNull().default("draft"), // 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
  validUntil: integer("valid_until", { mode: "timestamp_ms" }).notNull(),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const customers = sqliteTable("customers", {
  id: text("id").primaryKey(), // 'cst_...'
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  companyName: text("company_name"),
  country: text("country").default("Bangladesh"),
  status: text("status").notNull().default("lead"), // 'lead' | 'client' | 'inactive'
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const internalNotes = sqliteTable("internal_notes", {
  id: text("id").primaryKey(), // 'not_...'
  entityType: text("entity_type").notNull(), // 'inquiry' | 'lead' | 'quote' | 'customer'
  entityId: text("entity_id").notNull(),
  authorId: text("author_id"),
  authorName: text("author_name").notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// 5. Automation & Notifications
// ==========================================

export const automationRules = sqliteTable("automation_rules", {
  id: text("id").primaryKey(), // 'rul_...'
  name: text("name").notNull(),
  eventType: text("event_type").notNull(), // 'inquiry.created' | 'lead.stage_changed' | 'quote.created' | 'blog.scheduled_publish' | 'system.health_check'
  description: text("description").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  config: text("config", { mode: "json" }).$type<Record<string, unknown>>(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const automationRuns = sqliteTable("automation_runs", {
  id: text("id").primaryKey(), // 'run_...'
  ruleId: text("rule_id"),
  eventType: text("event_type").notNull(),
  status: text("status").notNull(), // 'success' | 'failed' | 'retrying'
  payload: text("payload", { mode: "json" }).$type<Record<string, unknown>>(),
  result: text("result", { mode: "json" }).$type<Record<string, unknown>>(),
  errorMessage: text("error_message"),
  executedAt: integer("executed_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const notifications = sqliteTable("notifications", {
  id: text("id").primaryKey(), // 'ntf_...'
  userId: text("user_id"), // null = broadcast to all admins
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().default("info"), // 'info' | 'success' | 'warning' | 'alert'
  actionUrl: text("action_url"),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// 6. Media & Assets
// ==========================================

export const mediaAssets = sqliteTable("media_assets", {
  id: text("id").primaryKey(), // 'med_...'
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  url: text("url").notNull(),
  altText: text("alt_text"),
  category: text("category").default("general"),
  uploadedBy: text("uploaded_by"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// Inferred TypeScript Types
// ==========================================

export type PocRecord = typeof pocRecords.$inferSelect;
export type NewPocRecord = typeof pocRecords.$inferInsert;
export type SystemHealthCheck = typeof systemHealthChecks.$inferSelect;

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type AdminRole = "owner" | "admin" | "editor" | "support";

export type AdminSession = typeof adminSessions.$inferSelect;
export type NewAdminSession = typeof adminSessions.$inferInsert;

export type AdminAuditLog = typeof adminAuditLogs.$inferSelect;
export type NewAdminAuditLog = typeof adminAuditLogs.$inferInsert;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;

export type PageSection = typeof pageSections.$inferSelect;
export type NewPageSection = typeof pageSections.$inferInsert;

export type ServiceEntity = typeof services.$inferSelect;
export type NewServiceEntity = typeof services.$inferInsert;

export type ServicePackageEntity = typeof servicePackages.$inferSelect;
export type NewServicePackageEntity = typeof servicePackages.$inferInsert;

export type BlogCategoryEntity = typeof blogCategories.$inferSelect;
export type NewBlogCategoryEntity = typeof blogCategories.$inferInsert;

export type BlogTagEntity = typeof blogTags.$inferSelect;
export type NewBlogTagEntity = typeof blogTags.$inferInsert;

export type BlogPostEntity = typeof blogPosts.$inferSelect;
export type NewBlogPostEntity = typeof blogPosts.$inferInsert;

export type BlogPostRevisionEntity = typeof blogPostRevisions.$inferSelect;
export type NewBlogPostRevisionEntity = typeof blogPostRevisions.$inferInsert;

export type PortfolioProjectEntity = typeof portfolioProjects.$inferSelect;
export type NewPortfolioProjectEntity = typeof portfolioProjects.$inferInsert;

export type FaqEntity = typeof faqs.$inferSelect;
export type NewFaqEntity = typeof faqs.$inferInsert;

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export type Quote = typeof quotes.$inferSelect;
export type NewQuote = typeof quotes.$inferInsert;

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export type InternalNote = typeof internalNotes.$inferSelect;
export type NewInternalNote = typeof internalNotes.$inferInsert;

export type AutomationRule = typeof automationRules.$inferSelect;
export type NewAutomationRule = typeof automationRules.$inferInsert;

export type AutomationRun = typeof automationRuns.$inferSelect;
export type NewAutomationRun = typeof automationRuns.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type NewMediaAsset = typeof mediaAssets.$inferInsert;
