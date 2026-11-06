CREATE TABLE `poc_records` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`metadata` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `system_health_checks` (
	`id` text PRIMARY KEY NOT NULL,
	`service_name` text NOT NULL,
	`is_healthy` integer DEFAULT true NOT NULL,
	`checked_at` integer NOT NULL
);
