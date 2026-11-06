# 07 — Database Design & Schema Specification (Cloudflare D1 + Drizzle ORM)

**Database Engine:** Cloudflare D1 (Serverless SQLite)  
**ORM:** Drizzle ORM (`drizzle-orm/sqlite-core` + `drizzle-orm/d1`)  
**Architecture Principle:** One Business → One Authoritative Production D1 Database (`projukti_labs_db`). Zero multi-tenancy overhead.

---

## 1. Global Database Engineering Rules

1. **Primary Keys:** Text-based **ULID** or **UUIDv7** (`id TEXT PRIMARY KEY NOT NULL`) generated in the application layer (`crypto.randomUUID()` or time-sortable ULID). Time-sortable IDs prevent B-tree index fragmentation in SQLite and support cursor pagination naturally.
2. **Timestamps:** Stored as ISO-8601 UTC strings (`TEXT`) or Unix epoch milliseconds (`INTEGER` with Drizzle `{ mode: 'timestamp_ms' }`) consistently across every table: `created_at`, `updated_at`, and `deleted_at` (where soft delete applies). We standardize on **Unix epoch milliseconds (`INTEGER`)** for compact storage, fast range indexing, and native Drizzle `mode: "timestamp_ms"` support.
3. **Booleans:** SQLite stores booleans as `INTEGER` (`0` or `1`) using Drizzle `integer("...", { mode: "boolean" })`.
4. **JSON Columns:** Structured arrays or flexible metadata (e.g., section payload, audit diff) use `text("...", { mode: "json" }).$type<T>()` validated by Zod before persistence.
5. **No Binary Blobs:** Images, PDFs, and videos are **strictly forbidden** in D1. D1 stores only `media_assets` metadata and R2 `storage_key` references.
6. **100-Parameter Limit Safeguard:** Because D1 caps bound parameters at 100 per SQL statement, any bulk insert helper (`chunkedBatchInsert`) must split array inserts into batches where `rowsPerStatement = Math.floor(90 / columnCount)` and execute them atomically via `db.batch()`.
7. **Launch v1.0 vs. Postponed Scope:** All 46 domain tables from Section 9.1 of the Master Blueprint are specified below, with explicit **v1.0 Launch Status** tags (`Core v1.0` vs. `Phase 09/Future Sub-module`) so migrations stay lean while preserving complete architectural continuity.

---

## 2. Domain A — Authentication, RBAC & Security (7 Tables — All `Core v1.0`)

### 2.1 `users`
- **Purpose:** Stores administrative and editorial staff accounts.
- **Columns:**
  - `id` (`TEXT PK`)
  - `email` (`TEXT NOT NULL UNIQUE`) — Lowercase normalized email.
  - `name` (`TEXT NOT NULL`)
  - `password_hash` (`TEXT NOT NULL`) — WebCrypto PBKDF2-SHA256 / Scrypt hash string.
  - `avatar_media_id` (`TEXT NULL FK -> media_assets.id ON DELETE SET NULL`)
  - `status` (`TEXT NOT NULL DEFAULT 'active'`) — `'active' | 'suspended' | 'invited'`
  - `mfa_enabled` (`INTEGER BOOL NOT NULL DEFAULT 0`)
  - `mfa_secret_encrypted` (`TEXT NULL`) — Optional encrypted TOTP secret.
  - `last_login_at` (`INTEGER NULL`)
  - `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`)
- **Indexes:** `idx_users_email` (Unique), `idx_users_status`.

### 2.2 `roles`
- **Purpose:** Defines RBAC roles (`super_admin`, `admin`, `editor`, `manager`, `support`).
- **Columns:** `id` (`TEXT PK`), `slug` (`TEXT NOT NULL UNIQUE`), `name` (`TEXT NOT NULL`), `description` (`TEXT NULL`), `is_system` (`INTEGER BOOL NOT NULL DEFAULT 1`), `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`).

### 2.3 `permissions`
- **Purpose:** Fine-grained capability keys (e.g., `services:write`, `blog:publish`, `leads:manage`, `settings:admin`).
- **Columns:** `id` (`TEXT PK`), `code` (`TEXT NOT NULL UNIQUE`), `module` (`TEXT NOT NULL`), `description` (`TEXT NULL`), `created_at` (`INTEGER NOT NULL`).

### 2.4 `role_permissions` & `user_roles`
- **Purpose:** Maps roles to permissions and users to roles (`users.role_id` FK on `users` for primary role + `role_permissions` join table).
- **Columns (`role_permissions`):** `role_id` (`TEXT NOT NULL FK -> roles.id ON DELETE CASCADE`), `permission_id` (`TEXT NOT NULL FK -> permissions.id ON DELETE CASCADE`), `created_at` (`INTEGER NOT NULL`). Primary Key: `(role_id, permission_id)`.

### 2.5 `sessions`
- **Purpose:** Server-side active login sessions backing HttpOnly cookies.
- **Columns:**
  - `id` (`TEXT PK`) — Session ID.
  - `token_hash` (`TEXT NOT NULL UNIQUE`) — SHA-256 hash of raw cookie token.
  - `user_id` (`TEXT NOT NULL FK -> users.id ON DELETE CASCADE`)
  - `ip_address` (`TEXT NULL`), `user_agent` (`TEXT NULL`)
  - `expires_at` (`INTEGER NOT NULL`), `revoked_at` (`INTEGER NULL`), `created_at` (`INTEGER NOT NULL`)
- **Indexes:** `idx_sessions_token_hash` (Unique), `idx_sessions_user_id`, `idx_sessions_expires_at`.

### 2.6 `login_attempts`
- **Purpose:** Tracks authentication attempts for brute-force lockout and security alerting.
- **Columns:** `id` (`TEXT PK`), `email` (`TEXT NOT NULL`), `ip_address` (`TEXT NOT NULL`), `user_agent` (`TEXT NULL`), `succeeded` (`INTEGER BOOL NOT NULL`), `failure_reason` (`TEXT NULL`), `attempted_at` (`INTEGER NOT NULL`).
- **Indexes:** `idx_login_attempts_email_time (email, attempted_at)`, `idx_login_attempts_ip_time (ip_address, attempted_at)`.
- **Retention:** Pruned after 90 days via scheduled maintenance workflow.

### 2.7 `audit_logs`
- **Purpose:** Immutable ledger of all administrative mutations and security events.
- **Columns:** `id` (`TEXT PK`), `actor_user_id` (`TEXT NULL FK -> users.id ON DELETE SET NULL`), `action` (`TEXT NOT NULL`), `entity_type` (`TEXT NOT NULL`), `entity_id` (`TEXT NULL`), `before_json` (`TEXT NULL`), `after_json` (`TEXT NULL`), `ip_address` (`TEXT NULL`), `request_id` (`TEXT NULL`), `created_at` (`INTEGER NOT NULL`).
- **Indexes:** `idx_audit_logs_entity (entity_type, entity_id)`, `idx_audit_logs_actor_time (actor_user_id, created_at DESC)`.

---

## 3. Domain B — Service Catalog & Productized Solutions (7 Tables — All `Core v1.0`)

### 3.1 `service_categories`
- **Purpose:** Stores the 3 Active Launch Categories (`web-development`, `ecommerce`, `maintenance-support`) and 7 Future Categories (`coming_soon` / `partner_supported`).
- **Columns:**
  - `id` (`TEXT PK`), `slug` (`TEXT NOT NULL UNIQUE`), `name` (`TEXT NOT NULL`), `name_bn` (`TEXT NULL`)
  - `tagline` (`TEXT NULL`), `description` (`TEXT NULL`), `icon_name` (`TEXT NULL`)
  - `availability_mode` (`TEXT NOT NULL DEFAULT 'coming_soon'`) — `'active' | 'coming_soon' | 'partner_supported'`
  - `is_public` (`INTEGER BOOL NOT NULL DEFAULT 1`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`)
  - `seo_metadata_id` (`TEXT NULL FK -> seo_metadata.id ON DELETE SET NULL`)
  - `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`)
- **Indexes:** `idx_service_categories_mode_sort (availability_mode, sort_order)`.

### 3.2 `services`
- **Purpose:** Individual services and dedicated Productized Service Landing Pages (e.g., `/services/landing-page-facebook-pixel`, `/services/complete-ecommerce-website`).
- **Columns:**
  - `id` (`TEXT PK`), `category_id` (`TEXT NOT NULL FK -> service_categories.id ON DELETE RESTRICT`)
  - `slug` (`TEXT NOT NULL UNIQUE`), `title` (`TEXT NOT NULL`), `subtitle` (`TEXT NULL`)
  - `service_type` (`TEXT NOT NULL DEFAULT 'productized'`) — `'standard' | 'productized' | 'flagship'`
  - `layout_variant` (`TEXT NOT NULL DEFAULT 'web_conversion'`) — `'web_conversion' | 'ecommerce_showcase' | 'pixel_funnel' | 'maintenance_plans' | 'custom_consultative'` (Enforces unique page compositions!)
  - `short_summary` (`TEXT NOT NULL`), `problem_statement_json` (`TEXT NULL`), `solution_overview_json` (`TEXT NULL`), `deliverables_json` (`TEXT NOT NULL`), `exclusions_json` (`TEXT NULL`), `process_steps_json` (`TEXT NULL`)
  - `starting_price_bdt` (`INTEGER NULL`), `starting_price_usd` (`INTEGER NULL`), `pricing_model` (`TEXT NOT NULL DEFAULT 'starting_from'`) — `'fixed' | 'starting_from' | 'custom_quote' | 'monthly_retainer'`
  - `status` (`TEXT NOT NULL DEFAULT 'draft'`) — `'draft' | 'published' | 'archived'`
  - `is_featured` (`INTEGER BOOL NOT NULL DEFAULT 0`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`)
  - `hero_media_id` (`TEXT NULL FK -> media_assets.id ON DELETE SET NULL`)
  - `seo_metadata_id` (`TEXT NULL FK -> seo_metadata.id ON DELETE SET NULL`)
  - `published_at` (`INTEGER NULL`), `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`), `deleted_at` (`INTEGER NULL`)
- **Indexes:** `idx_services_category_status (category_id, status, sort_order)`, `idx_services_featured (is_featured, status)`.

### 3.3 `service_packages`
- **Purpose:** Tiered packages within a service (e.g., Starter, Growth, Enterprise, or Basic/Business/Priority Care).
- **Columns:** `id` (`TEXT PK`), `service_id` (`TEXT NOT NULL FK -> services.id ON DELETE CASCADE`), `slug` (`TEXT NOT NULL`), `name` (`TEXT NOT NULL`), `badge_text` (`TEXT NULL`), `description` (`TEXT NULL`), `price_bdt` (`INTEGER NULL`), `price_usd` (`INTEGER NULL`), `billing_period` (`TEXT NOT NULL DEFAULT 'one_time'`) (`'one_time' | 'monthly' | 'yearly' | 'custom'`), `delivery_days_min` (`INTEGER NULL`), `delivery_days_max` (`INTEGER NULL`), `is_popular` (`INTEGER BOOL NOT NULL DEFAULT 0`), `cta_label` (`TEXT NOT NULL DEFAULT 'Get Started'`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`), `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`).
- **Unique Constraint:** `uniq_service_package_slug (service_id, slug)`.

### 3.4 `service_features`
- **Purpose:** Core deliverables, optional add-ons, and third-party exclusions mapped to `services` and/or `service_packages`.
- **Columns:** `id` (`TEXT PK`), `service_id` (`TEXT NOT NULL FK -> services.id ON DELETE CASCADE`), `package_id` (`TEXT NULL FK -> service_packages.id ON DELETE CASCADE`), `feature_group` (`TEXT NOT NULL DEFAULT 'core'`) (`'core' | 'addon' | 'excluded'`), `title` (`TEXT NOT NULL`), `description` (`TEXT NULL`), `is_included` (`INTEGER BOOL NOT NULL DEFAULT 1`), `value_label` (`TEXT NULL`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`).

### 3.5 `service_faqs`, `service_media`, `service_technologies`
- **`service_faqs`:** `id` (`TEXT PK`), `service_id` (`TEXT NOT NULL FK -> services.id ON DELETE CASCADE`), `question` (`TEXT NOT NULL`), `answer` (`TEXT NOT NULL`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`).
- **`service_media`:** `id` (`TEXT PK`), `service_id` (`TEXT NOT NULL FK -> services.id ON DELETE CASCADE`), `media_id` (`TEXT NOT NULL FK -> media_assets.id ON DELETE CASCADE`), `section_role` (`TEXT NOT NULL DEFAULT 'gallery'`), `caption` (`TEXT NULL`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`).
- **`service_technologies`:** `id` (`TEXT PK`), `service_id` (`TEXT NOT NULL FK -> services.id ON DELETE CASCADE`), `name` (`TEXT NOT NULL`), `category` (`TEXT NULL`), `icon_key` (`TEXT NULL`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`).

---

## 4. Domain C — Portfolio & Case Studies (5 Tables — All `Core v1.0`)

### 4.1 `project_categories`
- **Columns:** `id` (`TEXT PK`), `slug` (`TEXT NOT NULL UNIQUE`), `name` (`TEXT NOT NULL`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`), `created_at` (`INTEGER NOT NULL`).

### 4.2 `projects`
- **Purpose:** Portfolio showcase items (`/portfolio`, `/portfolio/[slug]`).
- **Columns:** `id` (`TEXT PK`), `category_id` (`TEXT NOT NULL FK -> project_categories.id ON DELETE RESTRICT`), `slug` (`TEXT NOT NULL UNIQUE`), `title` (`TEXT NOT NULL`), `client_name` (`TEXT NULL`), `client_region` (`TEXT NULL`), `project_type` (`TEXT NOT NULL`) (`'client' | 'internal_product' | 'concept_showcase'`), `summary` (`TEXT NOT NULL`), `challenge` (`TEXT NULL`), `solution` (`TEXT NULL`), `architecture_highlights_json` (`TEXT NULL`), `technologies_json` (`TEXT NOT NULL`), `live_url` (`TEXT NULL`), `completed_year` (`INTEGER NULL`), `featured_media_id` (`TEXT NULL FK -> media_assets.id ON DELETE SET NULL`), `seo_metadata_id` (`TEXT NULL FK -> seo_metadata.id ON DELETE SET NULL`), `is_featured` (`INTEGER BOOL NOT NULL DEFAULT 0`), `status` (`TEXT NOT NULL DEFAULT 'draft'`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`), `published_at` (`INTEGER NULL`), `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`), `deleted_at` (`INTEGER NULL`).

### 4.3 `project_media` & `project_services`
- **`project_media`:** `id` (`TEXT PK`), `project_id` (`TEXT NOT NULL FK -> projects.id ON DELETE CASCADE`), `media_id` (`TEXT NOT NULL FK -> media_assets.id ON DELETE CASCADE`), `device_frame` (`TEXT NOT NULL DEFAULT 'desktop'`) (`'desktop' | 'mobile' | 'diagram'`), `caption` (`TEXT NULL`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`).
- **`project_services`:** Join table linking portfolio projects to the productized services delivered: `(project_id, service_id)` composite PK.

### 4.4 `case_studies`
- **Purpose:** Deep-dive editorial engineering case studies (`/case-studies/[slug]`), optionally linked 1:1 with a `project_id`.
- **Columns:** `id` (`TEXT PK`), `project_id` (`TEXT NULL FK -> projects.id ON DELETE SET NULL`), `slug` (`TEXT NOT NULL UNIQUE`), `title` (`TEXT NOT NULL`), `subtitle` (`TEXT NULL`), `executive_summary` (`TEXT NOT NULL`), `problem_deep_dive_mdx` (`TEXT NOT NULL`), `architecture_solution_mdx` (`TEXT NOT NULL`), `verified_outcomes_json` (`TEXT NULL` — strictly verified facts, never fabricated metrics), `reading_time_minutes` (`INTEGER NOT NULL DEFAULT 5`), `featured_media_id` (`TEXT NULL FK -> media_assets.id ON DELETE SET NULL`), `seo_metadata_id` (`TEXT NULL FK -> seo_metadata.id ON DELETE SET NULL`), `status` (`TEXT NOT NULL DEFAULT 'draft'`), `published_at` (`INTEGER NULL`), `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`).

---

## 5. Domain D — Automated Blog & Knowledge CMS (8 Tables — All `Core v1.0`)

### 5.1 `authors`, `post_categories`, `tags`
- **`authors`:** `id` (`TEXT PK`), `user_id` (`TEXT NULL FK -> users.id ON DELETE SET NULL`), `slug` (`TEXT NOT NULL UNIQUE`), `name` (`TEXT NOT NULL`), `role_title` (`TEXT NOT NULL`), `bio` (`TEXT NULL`), `avatar_media_id` (`TEXT NULL FK -> media_assets.id`), `social_links_json` (`TEXT NULL`), `is_founder` (`INTEGER BOOL NOT NULL DEFAULT 0`), `created_at` (`INTEGER NOT NULL`).
- **`post_categories`:** `id` (`TEXT PK`), `slug` (`TEXT NOT NULL UNIQUE`), `name` (`TEXT NOT NULL`), `description` (`TEXT NULL`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`), `created_at` (`INTEGER NOT NULL`).
- **`tags`:** `id` (`TEXT PK`), `slug` (`TEXT NOT NULL UNIQUE`), `name` (`TEXT NOT NULL`), `created_at` (`INTEGER NOT NULL`).

### 5.2 `posts`
- **Purpose:** Primary blog articles with strict editorial approval state machine.
- **Columns:**
  - `id` (`TEXT PK`), `slug` (`TEXT NOT NULL UNIQUE`), `title` (`TEXT NOT NULL`), `excerpt` (`TEXT NOT NULL`)
  - `content_mdx` (`TEXT NOT NULL`), `content_format` (`TEXT NOT NULL DEFAULT 'mdx'`)
  - `category_id` (`TEXT NOT NULL FK -> post_categories.id ON DELETE RESTRICT`)
  - `author_id` (`TEXT NOT NULL FK -> authors.id ON DELETE RESTRICT`)
  - `featured_media_id` (`TEXT NULL FK -> media_assets.id ON DELETE SET NULL`)
  - `seo_metadata_id` (`TEXT NULL FK -> seo_metadata.id ON DELETE SET NULL`)
  - `status` (`TEXT NOT NULL DEFAULT 'draft'`) — `'draft' | 'in_review' | 'approved' | 'scheduled' | 'published' | 'archived'`
  - `is_ai_assisted` (`INTEGER BOOL NOT NULL DEFAULT 0`)
  - `approved_by_user_id` (`TEXT NULL FK -> users.id ON DELETE SET NULL`) — **Enforces human review before publish!**
  - `approved_at` (`INTEGER NULL`), `scheduled_for` (`INTEGER NULL`), `published_at` (`INTEGER NULL`)
  - `reading_time_minutes` (`INTEGER NOT NULL DEFAULT 1`), `word_count` (`INTEGER NOT NULL DEFAULT 0`), `view_count` (`INTEGER NOT NULL DEFAULT 0`)
  - `last_seo_audit_score` (`INTEGER NULL`), `last_seo_audit_json` (`TEXT NULL`), `social_draft_json` (`TEXT NULL`)
  - `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`), `deleted_at` (`INTEGER NULL`)
- **Indexes:** `idx_posts_status_pub (status, published_at DESC)`, `idx_posts_scheduled (status, scheduled_for)`, `idx_posts_category (category_id, status)`.

### 5.3 `post_tags`, `post_revisions`, `post_media`, `post_related`
- **`post_tags`:** `(post_id, tag_id)` composite PK with `ON DELETE CASCADE`.
- **`post_revisions`:** `id` (`TEXT PK`), `post_id` (`TEXT NOT NULL FK -> posts.id ON DELETE CASCADE`), `version_number` (`INTEGER NOT NULL`), `title` (`TEXT NOT NULL`), `content_mdx` (`TEXT NOT NULL`), `excerpt` (`TEXT NULL`), `change_note` (`TEXT NULL`), `created_by_user_id` (`TEXT NULL FK -> users.id`), `created_at` (`INTEGER NOT NULL`).
- **`post_media`:** `(post_id, media_id)` composite PK tracking inline images for alt-text auditing and orphan cleanup.
- **`post_related`:** `(post_id, related_post_id, sort_order)` for manual or deterministic related article linking.

---

## 6. Domain E — Business Inquiries & CRM Pipeline (7 Tables)

### 6.1 `inquiries` (`Core v1.0`)
- **Purpose:** Raw immutable capture of public `/contact`, `/get-a-quote`, and `/consultation-requests` submissions.
- **Columns:** `id` (`TEXT PK`), `reference_code` (`TEXT NOT NULL UNIQUE` — e.g. `PL-2026-8F9A`), `inquiry_type` (`TEXT NOT NULL` — `'quote' | 'contact' | 'consultation' | 'maintenance'`), `full_name` (`TEXT NOT NULL`), `email` (`TEXT NOT NULL`), `phone_whatsapp` (`TEXT NULL`), `company_name` (`TEXT NULL`), `country` (`TEXT NULL`), `service_id` (`TEXT NULL FK -> services.id ON DELETE SET NULL`), `package_id` (`TEXT NULL FK -> service_packages.id ON DELETE SET NULL`), `budget_range` (`TEXT NULL`), `currency` (`TEXT NOT NULL DEFAULT 'BDT'`), `timeline_preference` (`TEXT NULL`), `project_brief` (`TEXT NOT NULL`), `source_page` (`TEXT NULL`), `utm_json` (`TEXT NULL`), `ip_hash` (`TEXT NULL`), `created_at` (`INTEGER NOT NULL`).
- **Indexes:** `idx_inquiries_ref` (Unique), `idx_inquiries_created (created_at DESC)`, `idx_inquiries_email (email)`.

### 6.2 `leads` (`Core v1.0`)
- **Purpose:** Active CRM pipeline card created 1:1 from an inquiry or manually by an Admin.
- **Columns:** `id` (`TEXT PK`), `inquiry_id` (`TEXT NULL UNIQUE FK -> inquiries.id ON DELETE SET NULL`), `client_id` (`TEXT NULL FK -> clients.id ON DELETE SET NULL`), `title` (`TEXT NOT NULL`), `stage` (`TEXT NOT NULL DEFAULT 'new'`) — `'new' | 'reviewing' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'`, `priority` (`TEXT NOT NULL DEFAULT 'medium'`), `estimated_value_bdt` (`INTEGER NULL`), `estimated_value_usd` (`INTEGER NULL`), `assigned_to_user_id` (`TEXT NULL FK -> users.id ON DELETE SET NULL`), `lost_reason` (`TEXT NULL`), `last_contacted_at` (`INTEGER NULL`), `next_follow_up_at` (`INTEGER NULL`), `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`).
- **Indexes:** `idx_leads_stage_updated (stage, updated_at DESC)`, `idx_leads_followup (next_follow_up_at)`.

### 6.3 `lead_notes`, `lead_activities`, `follow_ups` (`Core v1.0`) & `clients`, `proposals` (`Phase 09 Sub-module`)
- **`lead_notes`:** `id` (`TEXT PK`), `lead_id` (`TEXT NOT NULL FK -> leads.id ON DELETE CASCADE`), `author_user_id` (`TEXT NOT NULL FK -> users.id`), `body` (`TEXT NOT NULL`), `created_at` (`INTEGER NOT NULL`).
- **`lead_activities`:** `id` (`TEXT PK`), `lead_id` (`TEXT NOT NULL FK -> leads.id ON DELETE CASCADE`), `actor_user_id` (`TEXT NULL FK -> users.id`), `activity_type` (`TEXT NOT NULL` — `'stage_change' | 'email_sent' | 'call_logged' | 'note_added'`), `summary` (`TEXT NOT NULL`), `metadata_json` (`TEXT NULL`), `created_at` (`INTEGER NOT NULL`).
- **`follow_ups`:** `id` (`TEXT PK`), `lead_id` (`TEXT NOT NULL FK -> leads.id ON DELETE CASCADE`), `assigned_user_id` (`TEXT NOT NULL FK -> users.id`), `due_at` (`INTEGER NOT NULL`), `channel` (`TEXT NOT NULL DEFAULT 'email'`), `notes` (`TEXT NULL`), `status` (`TEXT NOT NULL DEFAULT 'pending'`) (`'pending' | 'completed' | 'cancelled'`), `completed_at` (`INTEGER NULL`), `created_at` (`INTEGER NOT NULL`).
- **`clients` & `proposals`:** Defined in Drizzle schema for won-lead conversion (`clients`: profile, company, billing currency; `proposals`: scope summary, valid until, total BDT/USD, status), activated in Phase 09 without premature invoice/payment bloat.

---

## 7. Domain F — Maintenance & Technical Support (4 Tables)

- **`maintenance_plans` (`Core v1.0`):** `id` (`TEXT PK`), `slug` (`TEXT NOT NULL UNIQUE` — `basic-care`, `business-care`, `priority-care`, `custom-retainer`), `name` (`TEXT NOT NULL`), `price_monthly_bdt` (`INTEGER NULL`), `price_monthly_usd` (`INTEGER NULL`), `response_time_sla_hours` (`INTEGER NOT NULL`), `support_hours_included` (`INTEGER NOT NULL`), `backup_frequency` (`TEXT NOT NULL`), `included_tasks_json` (`TEXT NOT NULL`), `excluded_tasks_json` (`TEXT NOT NULL`), `emergency_support_rule` (`TEXT NOT NULL`), `is_active` (`INTEGER BOOL NOT NULL DEFAULT 1`), `sort_order` (`INTEGER NOT NULL DEFAULT 0`), `created_at` (`INTEGER NOT NULL`), `updated_at` (`INTEGER NOT NULL`).
- **`subscriptions`, `support_tickets`, `support_messages` (`Phase 09 Operations`):** Tracks active client care retainers and support requests submitted by maintenance clients.

---

## 8. Domain G — Website CMS, Media & Operational Automation (11 Tables — All `Core v1.0`)

1. **`site_settings`:** Key-value & structured global settings (`id`, `setting_key UNIQUE`, `value_json`, `is_public`, `updated_by_user_id`, `updated_at`).
2. **`pages`:** Static/CMS page metadata (`id`, `slug UNIQUE`, `title`, `page_type`, `status`, `seo_metadata_id`, `updated_at`).
3. **`page_sections`:** Powers the **Structured Homepage & Page Section Builder** (`id`, `page_id FK`, `section_key`, `section_type`, `title`, `subtitle`, `content_json`, `is_visible`, `sort_order`, `updated_at`).
4. **`navigation_items`:** Header, footer, and mobile nav items (`id`, `menu_location` `'header'|'footer'|'mobile_bottom'`, `parent_id`, `label`, `href`, `badge_text`, `is_external`, `sort_order`, `is_visible`).
5. **`media_assets`:** Authoritative catalog of R2 objects (`id`, `storage_key UNIQUE`, `public_url`, `filename`, `mime_type`, `size_bytes`, `width`, `height`, `alt_text`, `title`, `folder`, `uploaded_by_user_id`, `created_at`).
6. **`seo_metadata`:** Reusable polymorphic/FK SEO record (`id`, `meta_title`, `meta_description`, `canonical_url`, `og_title`, `og_description`, `og_media_id FK -> media_assets.id`, `robots_index`, `robots_follow`, `structured_data_json`, `updated_at`).
7. **`redirects`:** 301/302 URL redirect rules (`id`, `source_path UNIQUE`, `destination_url`, `status_code DEFAULT 301`, `is_active`, `hit_count`, `created_at`).
8. **`automation_jobs`:** Tracks every Workflow/Queue execution (`id`, `job_type`, `trigger_source`, `idempotency_key UNIQUE`, `status` `'queued'|'running'|'completed'|'failed'|'dead_letter'`, `payload_json`, `attempt_count`, `max_attempts`, `last_error`, `started_at`, `completed_at`, `created_at`).
9. **`automation_logs`:** Step-level execution logs for `automation_jobs` (`id`, `job_id FK -> automation_jobs.id ON DELETE CASCADE`, `step_name`, `level`, `message`, `details_json`, `created_at`).
10. **`scheduled_tasks`:** Registry of recurring cron jobs and their last/next run status (`id`, `task_key UNIQUE`, `cron_expression`, `is_enabled`, `last_run_at`, `last_status`, `updated_at`).
11. **`notification_logs`:** Outbound email/alert delivery ledger (`id`, `channel`, `recipient`, `template_key`, `subject`, `reference_entity_type`, `reference_entity_id`, `provider_message_id`, `status`, `error_message`, `sent_at`, `created_at`).

