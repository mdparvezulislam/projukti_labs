CREATE TABLE `blog_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`seo_title` text,
	`seo_description` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_categories_slug_unique` ON `blog_categories` (`slug`);--> statement-breakpoint
CREATE TABLE `blog_post_revisions` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`excerpt` text,
	`content` text NOT NULL,
	`content_format` text DEFAULT 'markdown' NOT NULL,
	`author_id` text,
	`revision_note` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `blog_tags` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_tags_slug_unique` ON `blog_tags` (`slug`);--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `subtitle` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `content_format` text DEFAULT 'markdown' NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `content_plain_text` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `category_id` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `author_id` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `author_name` text DEFAULT 'Md Parvezul Islam';--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `author_role` text DEFAULT 'Principal Software Architect & Founder';--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `image_alt` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `image_title` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `image_caption` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `image_credit` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `image_width` integer;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `image_height` integer;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `image_mime_type` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `is_pinned` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `allow_comments` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `editorial_notes` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `language` text DEFAULT 'bn' NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `version` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `reading_time_minutes` integer DEFAULT 5;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `word_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `character_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `heading_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `paragraph_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `table_of_contents` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `last_content_analysis_at` integer;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `last_saved_at` integer;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `canonical_url` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `focus_keyword` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `secondary_keywords` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `robots_index` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `robots_follow` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `og_title` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `og_description` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `og_image` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `twitter_title` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `twitter_description` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `twitter_image` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `structured_data_type` text DEFAULT 'Article';