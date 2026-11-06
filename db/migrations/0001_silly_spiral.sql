CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`reference_code` text NOT NULL,
	`inquiry_type` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone_whatsapp` text,
	`company_name` text,
	`country` text,
	`service_id` text,
	`package_id` text,
	`budget_range` text,
	`currency` text DEFAULT 'BDT' NOT NULL,
	`timeline_preference` text,
	`project_brief` text NOT NULL,
	`source_page` text,
	`utm_json` text,
	`ip_hash` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inquiries_reference_code_unique` ON `inquiries` (`reference_code`);--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`inquiry_id` text,
	`title` text NOT NULL,
	`stage` text DEFAULT 'new' NOT NULL,
	`priority` text DEFAULT 'medium' NOT NULL,
	`estimated_value_bdt` integer,
	`estimated_value_usd` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
