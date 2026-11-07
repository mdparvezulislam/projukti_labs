PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE IF NOT EXISTS "d1_migrations"(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(1,'0000_glossy_mantis.sql','2026-11-07 03:26:44');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(2,'0001_silly_spiral.sql','2026-11-07 03:26:45');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(3,'0002_slippery_firedrake.sql','2026-11-07 03:26:45');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(4,'0003_boring_namorita.sql','2026-11-07 04:16:39');
CREATE TABLE `poc_records` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`metadata` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
CREATE TABLE `system_health_checks` (
	`id` text PRIMARY KEY NOT NULL,
	`service_name` text NOT NULL,
	`is_healthy` integer DEFAULT true NOT NULL,
	`checked_at` integer NOT NULL
);
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
, `status` text DEFAULT 'new' NOT NULL, `assigned_to` text, `notes` text, `updated_at` integer NOT NULL);
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
CREATE TABLE `admin_audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`user_email` text,
	`action` text NOT NULL,
	`resource_type` text NOT NULL,
	`resource_id` text,
	`details` text,
	`ip_hash` text,
	`created_at` integer NOT NULL
);
CREATE TABLE `admin_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
CREATE TABLE `admin_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`password_salt` text NOT NULL,
	`role` text DEFAULT 'editor' NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`last_login_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
CREATE TABLE `automation_rules` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`event_type` text NOT NULL,
	`description` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`config` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
CREATE TABLE `automation_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`rule_id` text,
	`event_type` text NOT NULL,
	`status` text NOT NULL,
	`payload` text,
	`result` text,
	`error_message` text,
	`executed_at` integer NOT NULL
);
CREATE TABLE `blog_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`tags` text,
	`cover_image` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	`read_time` text,
	`seo_title` text,
	`seo_description` text,
	`scheduled_at` integer,
	`published_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
, `subtitle` text, `content_format` text DEFAULT 'markdown' NOT NULL, `content_plain_text` text, `category_id` text, `author_id` text, `author_name` text DEFAULT 'Md Parvezul Islam', `author_role` text DEFAULT 'Principal Software Architect & Founder', `image_alt` text, `image_title` text, `image_caption` text, `image_credit` text, `image_width` integer, `image_height` integer, `image_mime_type` text, `is_pinned` integer DEFAULT false NOT NULL, `allow_comments` integer DEFAULT false NOT NULL, `editorial_notes` text, `language` text DEFAULT 'bn' NOT NULL, `version` integer DEFAULT 1 NOT NULL, `reading_time_minutes` integer DEFAULT 5, `word_count` integer DEFAULT 0, `character_count` integer DEFAULT 0, `heading_count` integer DEFAULT 0, `paragraph_count` integer DEFAULT 0, `table_of_contents` text, `last_content_analysis_at` integer, `last_saved_at` integer, `canonical_url` text, `focus_keyword` text, `secondary_keywords` text, `robots_index` integer DEFAULT true NOT NULL, `robots_follow` integer DEFAULT true NOT NULL, `og_title` text, `og_description` text, `og_image` text, `twitter_title` text, `twitter_description` text, `twitter_image` text, `structured_data_type` text DEFAULT 'Article');
INSERT INTO "blog_posts" ("id","slug","title","excerpt","content","category","tags","cover_image","status","is_featured","read_time","seo_title","seo_description","scheduled_at","published_at","created_at","updated_at","subtitle","content_format","content_plain_text","category_id","author_id","author_name","author_role","image_alt","image_title","image_caption","image_credit","image_width","image_height","image_mime_type","is_pinned","allow_comments","editorial_notes","language","version","reading_time_minutes","word_count","character_count","heading_count","paragraph_count","table_of_contents","last_content_analysis_at","last_saved_at","canonical_url","focus_keyword","secondary_keywords","robots_index","robots_follow","og_title","og_description","og_image","twitter_title","twitter_description","twitter_image","structured_data_type") VALUES('post_01','why-business-needs-professional-website','একটি ব্যবসার জন্য Professional Website কেন অপরিহার্য?','শুধু সোশ্যাল মিডিয়া পেজের ওপর নির্ভর করে কি দীর্ঘমেয়াদী ব্র্যান্ড তৈরি সম্ভব? জানুন কেন আধুনিক ব্যবসার জন্য একটি কাস্টম প্রফেশনাল ওয়েবসাইট সর্বোচ্চ আরওআই (ROI) নিশ্চিত করে।',replace('\n## ভূমিকা: সোশ্যাল মিডিয়া কি একটি ব্যবসার একমাত্র সমাধান?\n\nআজকাল বাংলাদেশে বহু ব্যবসা ফেসবুক পেজ বা ইনস্টাগ্রাম প্রোফাইলের মাধ্যমে শুরু হয়। নিঃসন্দেহে দ্রুত কাস্টমার এনগেজমেন্টের জন্য এটি ভালো একটি মাধ্যম। কিন্তু যখন আপনার ব্র্যান্ড বড় হতে শুরু করে, তখন সম্পূর্ণ ভিন্ন কিছু চ্যালেঞ্জ সামনে আসে:\n\n1. **অ্যালগরিদম নির্ভরতা:** সোশ্যাল মিডিয়া প্ল্যাটফর্ম তাদের অ্যালগরিদম পরিবর্তন করলে এক রাতের মধ্যে আপনার অর্গানিক রিচ ৮০% পর্যন্ত কমে যেতে পারে।\n2. **কাস্টমার ট্রাস্ট বা বিশ্বাসযোগ্যতা:** প্রাতিষ্ঠানিক ক্লায়েন্ট বা আন্তর্জাতিক ক্রেতারা লেনদেনের পূর্বে কোম্পানির নিজস্ব ডোমেইন ও অফিসিয়াল ডিজিটাল উপস্থিতি যাচাই করেন।\n3. **ডেটার পূর্ণ মালিকানা:** ফেসবুক বা ইনস্টাগ্রামে আপনার ফলোয়ার তালিকা আপনার নিজস্ব ডেটা নয়। কিন্তু নিজস্ব ওয়েবসাইটে সংগৃহীত লিড এবং কাস্টমার হিস্ট্রি ১০০% আপনার মালিকানাধীন।\n\n---\n\n## ১. ডিজিটাল পরিচয় ও সার্চ ইঞ্জিন অথরিটি (SEO)\n\nএকটি নিজস্ব ওয়েবসাইট থাকা মানে আপনার ব্যবসার একটি স্থায়ী ডিজিটাল ঠিকানা তৈরি হওয়া। গুগল বা অন্যান্য সার্চ ইঞ্জিনে যখন কোনো কাস্টমার আপনার সেবা লিখে সার্চ করেন, তখন ফেসবুক পেজের চেয়ে একটি অপটিমাইজড ওয়েবসাইট বহু গুণ এগিয়ে থাকে।\n\n> "আপনার ওয়েবসাইট হলো আপনার কোম্পানির সার্বক্ষণিক হেডকোয়ার্টার—যেখানে কোনো থার্ড-পার্টি প্ল্যাটফর্মের নিষেধাজ্ঞা বা সীমা থাকে না।"\n\n---\n\n## ২. ইউজার এক্সপেরিয়েন্স ও ব্রাউজিং সুবিধা\n\nএকটি প্রফেশনাল ওয়েবসাইটে আপনার সেবার ক্যাটালগ, প্যাকেজের দাম, সফল প্রজেক্টের কেস স্টাডি এবং কন্টাক্ট ফরম অত্যন্ত সুশৃঙ্খলভাবে সাজানো থাকে। কাস্টমারকে ইনবক্সে এসে ঘন্টার পর ঘন্টা মেসেজ আদান-প্রদান করতে হয় না; তারা সরাসরি তাদের প্রয়োজনীয় তথ্য পেয়ে সিদ্ধান্ত নিতে পারেন।\n\n---\n\n## ৩. কনভার্সন অপটিমাইজেশন ও লিড ট্র্যাকিং\n\nওয়েবসাইটের মাধ্যমে আপনি প্রতিটি ভিজিটরের অ্যাক্টিভিটি ট্র্যাক করতে পারেন। কে কোন পেজ পড়ছেন, কোন সেবায় আগ্রহী হচ্ছেন এবং কোথায় গিয়ে সিদ্ধান্ত পরিবর্তন করছেন—এসব তথ্য বিশ্লেষণ করে বিজ্ঞাপনী খরচ উল্লেখযোগ্যভাবে কমানো সম্ভব।\n\n---\n\n## উপসংহার\n\nএকটি প্রফেশনাল ওয়েবসাইট কোনো বিলাসিতা নয়, বরং ব্যবসার স্থায়ী প্রবৃদ্ধির জন্য সবচেয়ে গুরুত্বপূর্ণ দীর্ঘমেয়াদী বিনিয়োগ। আপনি যদি আপনার ব্র্যান্ডকে পরবর্তী স্তরে নিয়ে যেতে চান, তবে একটি হাই-স্পিড ও টাইপ-সেফ ওয়েবসাইট দিয়ে শুরু করাই সবচেয়ে বুদ্ধিমত্তার সিদ্ধান্ত।\n','\n',char(10)),'web-development','["Web Development","Business Growth","Branding"]',NULL,'published',1,'5 min read','একটি ব্যবসার জন্য Professional Website কেন অপরিহার্য? | Projukti Labs','বাংলাদেশে ব্যবসার স্থায়ী প্রবৃদ্ধি ও কাস্টমার বিশ্বাস অর্জনে প্রফেশনাল ওয়েবসাইটের ভূমিকা এবং কারিগরি গুরুত্ব বিশ্লেষণ।',NULL,1793505600000,1793505600000,1794018063646,NULL,'markdown',NULL,NULL,NULL,'Md Parvezul Islam','Principal Software Architect & Founder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'bn',1,5,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,'Article');
INSERT INTO "blog_posts" ("id","slug","title","excerpt","content","category","tags","cover_image","status","is_featured","read_time","seo_title","seo_description","scheduled_at","published_at","created_at","updated_at","subtitle","content_format","content_plain_text","category_id","author_id","author_name","author_role","image_alt","image_title","image_caption","image_credit","image_width","image_height","image_mime_type","is_pinned","allow_comments","editorial_notes","language","version","reading_time_minutes","word_count","character_count","heading_count","paragraph_count","table_of_contents","last_content_analysis_at","last_saved_at","canonical_url","focus_keyword","secondary_keywords","robots_index","robots_follow","og_title","og_description","og_image","twitter_title","twitter_description","twitter_image","structured_data_type") VALUES('post_02','how-ecommerce-works-in-bangladesh','বাংলাদেশে সফল Online Business-এর জন্য E-commerce প্ল্যাটফর্ম কীভাবে কাজ করে?','বিকাশ, নগদ, কুরিয়ার অটোমেশন এবং ড্রপ-অফ মুক্ত চেকআউট—বাংলাদেশে একটি হাই-কনভার্টিং ই-কমার্স প্ল্যাটফর্মের নেপথ্যে কী কী কারিগরি উপাদান কাজ করে?',replace('\n## ভূমিকা: সাধারণ স্টোরফ্রন্ট বনাম হাই-কনভার্টিং প্ল্যাটফর্ম\n\nবাংলাদেশে অনলাইন শপিংয়ের বাজার দ্রুত সম্প্রসারিত হচ্ছে। কিন্তু বেশিরভাগ অনলাইন উদ্যোক্তা একটি সাধারণ সমস্যায় পড়েন: প্রচুর ভিজিটর ওয়েবসাইটে আসেন, কিন্তু কার্ট পেজ পর্যন্ত গিয়ে অর্ডার সম্পূর্ণ না করে বের হয়ে যান। একে বলা হয় **কার্ট ড্রপ-অফ (Cart Drop-off)**।\n\nসফল ই-কমার্স পরিচালনার জন্য প্ল্যাটফর্মটিকে বাংলাদেশি ক্রেতাদের মনস্তত্ত্ব এবং স্থানীয় লজিস্টিকসের সঙ্গে সম্পূর্ণ সামঞ্জস্যপূর্ণ হতে হয়।\n\n---\n\n## ১. ফ্রিকাশনলেস ও টু-স্টেপ চেকআউট\n\nবাংলাদেশি ক্রেতারা জটিল রেজিস্ট্রেশন ফরম বা অতিরিক্ত তথ্য দেওয়া পছন্দ করেন না। একটি সফল ই-কমার্স আর্কিটেকচারে দরকার:\n- **গেস্ট চেকআউট সুবিধা:** অ্যাকাউন্ট না খুলেও কেবল নাম, ফোন নম্বর ও ডেলিভারি ঠিকানা দিয়ে অর্ডার সম্পন্ন করার সুযোগ।\n- **মোবাইল-ফার্স্ট ইন্টারফেস:** ৮০% এর বেশি অর্ডার আসে মোবাইল ব্রাউজার থেকে। তাই কার্ট পেজ থেকে পেমেন্ট পর্যন্ত বাটনের মাপ কমপক্ষে ৪৪×৪৪ পিক্সেল হওয়া দরকার।\n\n---\n\n## ২. স্থানীয় পেমেন্ট গেটওয়ে ইন্টিগ্রেশন (bKash & Nagad)\n\nম্যানুয়ালি বিকাশ নম্বরে টাকা পাঠিয়ে ট্রানজাকশন আইডি মেসেজ করার দিন শেষ। আধুনিক গ্রাহকরা ইনস্ট্যান্ট ভেরিফিকেশন চান:\n- **অফিসিয়াল বিকাশ পেমেন্ট গেটওয়ে (PGW):** কাস্টমার স্ক্রিনেই ওটিপি (OTP) ও পিন দিয়ে ১ ক্লিকে টাকা পরিশোধ করবেন এবং সিস্টেম স্বয়ংক্রিয়ভাবে অর্ডার স্ট্যাটাস ''Paid'' হিসেবে আপডেট করবে।\n- **এসএসএলকমার্জ (SSLCommerz) / নগদ / কার্ড:** আন্তর্জাতিক ভিসা ও মাস্টারকার্ড সাপোর্টের মাধ্যমে প্রবাসীদের কাছ থেকেও অর্ডার গ্রহণের ব্যবস্থা রাখা সম্ভব।\n\n---\n\n## ৩. স্বয়ংক্রিয় কুরিয়ার এপিআই ইন্টিগ্রেশন (Steadfast / Pathao)\n\nঅর্ডার আসার পর প্রতিদিন ম্যানুয়ালি কুরিয়ার পোর্টালে পার্সেল এন্ট্রি করা সময়সাপেক্ষ ও ভুলের কারণ। \nআধুনিক ই-কমার্স সিস্টেমে অ্যাডমিন প্যানেল থেকেই এক ক্লিকে স্টিডফাস্ট বা পাঠাও এপিআই-এর মাধ্যমে কনসাইনমেন্ট তৈরি হয়, স্বয়ংক্রিয় ট্র্যাকিং কোড জেনারেট হয় এবং কাস্টমারের মোবাইলে ট্র্যাকিং এসএমএস চলে যায়।\n\n---\n\n## ৪. লাইসেন্স ফি ও কমিশনের হাত থেকে মুক্তি\n\nঅনেক শপিফাই বা সাশ (SaaS) প্ল্যাটফর্মে প্রতি মাসে ডলার খরচ করে সাবস্ক্রিপশন ফি এবং বিক্রির ওপর ১-২% কমিশন দিতে হয়। \nকাস্টম আধুনিক আর্কিটেকচারে (Next.js + ক্লাউডফ্লেয়ার ডি১) ওয়েবসাইট তৈরি করলে প্ল্যাটফর্মকে কোনো মাসিক রাজস্ব কমিশন দিতে হয় না—স্টোরের সম্পূর্ণ নিয়ন্ত্রণ আপনার হাতে থাকে।\n','\n',char(10)),'ecommerce','["E-commerce","bKash","Nagad","Courier API"]',NULL,'published',0,'6 min read','বাংলাদেশে সফল E-commerce প্ল্যাটফর্ম আর্কিটেকচার গাইড | Projukti Labs','বাংলাদেশে ই-কমার্স ওয়েবসাইটের চেকআউট অপটিমাইজেশন, বিকাশ ও নগদ পেমেন্ট গেটওয়ে এবং কুরিয়ার এপিআই ইন্টিগ্রেশন কৌশল।',NULL,1793683800000,1793683800000,1794018063646,NULL,'markdown',NULL,NULL,NULL,'Md Parvezul Islam','Principal Software Architect & Founder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'bn',1,5,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,'Article');
INSERT INTO "blog_posts" ("id","slug","title","excerpt","content","category","tags","cover_image","status","is_featured","read_time","seo_title","seo_description","scheduled_at","published_at","created_at","updated_at","subtitle","content_format","content_plain_text","category_id","author_id","author_name","author_role","image_alt","image_title","image_caption","image_credit","image_width","image_height","image_mime_type","is_pinned","allow_comments","editorial_notes","language","version","reading_time_minutes","word_count","character_count","heading_count","paragraph_count","table_of_contents","last_content_analysis_at","last_saved_at","canonical_url","focus_keyword","secondary_keywords","robots_index","robots_follow","og_title","og_description","og_image","twitter_title","twitter_description","twitter_image","structured_data_type") VALUES('post_03','website-speed-and-core-web-vitals-guide','Website Speed এবং Core Web Vitals: স্লো ওয়েবসাইটের কারণে কেন কাস্টমার হারাবেন?','মোবাইলে একটি ওয়েবসাইট লোড হতে ৩ সেকেন্ডের বেশি সময় নিলে ৫০% এর বেশি ভিজিটর ব্যাক বাটনে চাপ দেন। কীভাবে কোর ওয়েব ভাইটালস অপটিমাইজেশন আপনার বিজ্ঞাপনী খরচ কমায়?',replace('\n## ভূমিকা: প্রতি মিলিসেকেন্ডের আর্থিক মূল্য\n\nগুগলের ডেটা অনুযায়ী, কোনো ওয়েবসাইটের লোডিং সময় যদি ১ সেকেন্ড থেকে বেড়ে ৩ সেকেন্ড হয়, তবে ভিজিটরের সাইট ছেড়ে চলে যাওয়ার সম্ভাবনা ৩২% বৃদ্ধি পায়। আর যদি ৫ সেকেন্ড ছাড়িয়ে যায়, তবে সেই সম্ভাবনা বাড়ে ৯০% পর্যন্ত!\n\nবিশেষ করে বাংলাদেশে, যেখানে অধিকাংশ কাস্টমার ৪জি মোবাইল নেটওয়ার্কে ব্রাউজ করেন, সেখানে হেভি জাভাস্ক্রিপ্ট ও আন-অপটিমাইজড প্লাগইন সমৃদ্ধ সাইট মারাত্মক বাধার সৃষ্টি করে।\n\n---\n\n## ১. Core Web Vitals-এর ৩টি মূল স্তম্ভ\n\nগুগল মূলত তিনটি মেট্রিকের ওপর ভিত্তি করে একটি ওয়েবসাইটের ইউজার এক্সপেরিয়েন্স পরিমাপ করে:\n\n1. **Largest Contentful Paint (LCP):** পেজের প্রধান ব্যানার বা কন্টেন্ট কত দ্রুত ভিজিটরের চোখে দৃশ্যমান হচ্ছে। আমাদের টার্গেট: ১.২ থেকে ২.০ সেকেন্ডের মধ্যে।\n2. **Cumulative Layout Shift (CLS):** পেজ লোড হওয়ার সময় ছবি বা ফন্টের কারণে টেক্সট বা বাটন লাফিয়ে সরে যাচ্ছে কি না। স্কোর হওয়া উচিত ০.০৫ এর নিচে।\n3. **Interaction to Next Paint (INP):** কোনো বাটনে ক্লিক করার পর সাইটটি কত দ্রুত প্রতিক্রিয়া দেখাচ্ছে। লক্ষ্য: ১০০ মিলিসেকেন্ডের নিচে।\n\n---\n\n## ২. হেভি ওয়ার্ডপ্রেস বনাম মডার্ন এজ আর্কিটেকচার\n\nচিরাচরিত ওয়ার্ডপ্রেস সাইটে ২০ থেকে ৪০টি প্লাগইন ব্যবহার করা হয়। প্রতিটি প্লাগইন আলাদা সিএসএস ও জেএস ফাইল লোড করে সার্ভারের ওপর চাপ ফেলে। \nবিপরীতে, **Next.js App Router** এবং **Cloudflare Workers**-এর মতো এজ প্ল্যাটফর্মে পেজগুলো বিশ্বব্যাপী ৩ শতাধিক ডেটাসেন্টার থেকে সরাসরি ক্যাশড হয়ে কয়েক মিলিসেকেন্ডের মধ্যে ভিজিটরের স্ক্রিনে পৌঁছায়।\n\n---\n\n## ৩. কীভাবে দ্রুত গতি সরাসরি বিজ্ঞাপন খরচ কমায়?\n\nআপনি যখন ফেসবুকে বা গুগলে অ্যাড চালান, তখন প্রতি ক্লিকে আপনার টাকা কাটে। কিন্তু সাইট স্লো হওয়ার কারণে ভিজিটর পেজ খোলার আগেই যদি ব্যাক করে চলে যান, তবে আপনার সেই বিজ্ঞাপনী খরচ সম্পূর্ণ অপচয় হয়। \nগতি অপটিমাইজড ল্যান্ডিং পেজে বাউন্স রেট কমে যায় এবং কাস্টমার অ্যাকুইজিশন কস্ট (CAC) অনেক সাশ্রয়ী হয়।\n','\n',char(10)),'website-performance','["Speed","Core Web Vitals","LCP","SEO"]',NULL,'published',0,'5 min read','Website Speed ও Core Web Vitals অপটিমাইজেশন গাইড | Projukti Labs','ওয়েবসাইট স্পিড কীভাবে কনভার্সন রেট এবং গুগল র‍্যাঙ্কিং নিয়ন্ত্রণ করে। LCP, CLS এবং INP অপটিমাইজেশনের বাস্তব কৌশল।',NULL,1793762100000,1793762100000,1794018063646,NULL,'markdown',NULL,NULL,NULL,'Md Parvezul Islam','Principal Software Architect & Founder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'bn',1,5,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,'Article');
INSERT INTO "blog_posts" ("id","slug","title","excerpt","content","category","tags","cover_image","status","is_featured","read_time","seo_title","seo_description","scheduled_at","published_at","created_at","updated_at","subtitle","content_format","content_plain_text","category_id","author_id","author_name","author_role","image_alt","image_title","image_caption","image_credit","image_width","image_height","image_mime_type","is_pinned","allow_comments","editorial_notes","language","version","reading_time_minutes","word_count","character_count","heading_count","paragraph_count","table_of_contents","last_content_analysis_at","last_saved_at","canonical_url","focus_keyword","secondary_keywords","robots_index","robots_follow","og_title","og_description","og_image","twitter_title","twitter_description","twitter_image","structured_data_type") VALUES('post_04','meta-pixel-and-conversion-tracking-explained','Meta Pixel ও Conversions API (CAPI): বিজ্ঞাপনে সঠিক ট্র্যাকিং কীভাবে নিশ্চিত করবেন?','আইওএস প্রাইভেসি আপডেট ও অ্যাড-ব্লকারের কারণে ব্রাউজার পিক্সেল এখন ২০% থেকে ৪০% ডেটা মিস করে। জানুন কীভাবে সার্ভার-সাইড ট্র্যাকিং আপনার মেটা অ্যাডের ফলাফল আমূল বদলে দেয়।',replace('\n## ভূমিকা: কেন ব্রাউজার পিক্সেল একা আর যথেষ্ট নয়?\n\nঅতীতে ফেসবুক বিজ্ঞাপনে কনভার্সন ট্র্যাক করার জন্য ওয়েবসাইটে একটি ছোট্ট জাভাস্ক্রিপ্ট কোড (পিক্সেল) বসিয়ে দিলেই চলত। কিন্তু গত কয়েক বছরে ডিজিটাল ট্র্যাকিং ব্যবস্থায় বড় ধরনের পরিবর্তন এসেছে:\n\n- **অ্যাপল আইওএস ১৪+ প্রাইভেসি পলিসি:** আইফোন ব্যবহারকারীরা অ্যাপ ট্র্যাকিং অপ্ট-আউট করায় ব্রাউজার কুকি ব্লক হয়ে যায়।\n- **অ্যাড-ব্লকার ও ব্রাউজার রেস্ট্রিকশন:** ব্রেভ, ক্রোম এক্সটেনশন কিংবা সাফারি ইন্টেলিজেন্ট ট্র্যাকিং প্রিভেনশন সাধারণ ব্রাউজার পিক্সেলকে কল পাঠাতে বাধা দেয়।\n- **নেটওয়ার্ক ড্রপ:** পেজ সম্পূর্ণ লোড হওয়ার আগেই যদি ফর্ম সাবমিট হয়, অনেক সময় পিক্সেল ইভেন্ট ফায়ার হতে পারে না।\n\nফলস্বরূপ, আপনার বিজ্ঞাপনে সেল হলেও মেটা ইভেন্টস ম্যানেজার তা ট্র্যাক করতে পারে না। ফলে অ্যালগরিদম ভুল অডিয়েন্সের কাছে বিজ্ঞাপন দেখাতে শুরু করে।\n\n---\n\n## ১. মেটা কনভার্সনস এপিআই (CAPI) কী?\n\nকনভার্সনস এপিআই হলো এমন একটি ব্যবস্থা যেখানে ব্রাউজারের ওপর নির্ভর না করে ক্লাউড সার্ভার থেকে সরাসরি ফেসবুকের গ্রাফ এপিআই-এ নিরাপদ এইচটিটিপি (HTTP POST) রিকোয়েস্ট পাঠানো হয়।\n\n```text\n[ভিজিটরের অ্যাকশন] ──> [ক্লাউড সার্ভার] ──(নিরাপদ পোস্ট রিকোয়েস্ট)──> [Meta Graph API]\n```\n\nযেহেতু এই ডেটা ব্রাউজারের ভেতর দিয়ে যায় না, তাই কোনো অ্যাড-ব্লকার বা ব্রাউজার পলিসি একে আটকাতে পারে না।\n\n---\n\n## ২. ইভেন্ট ডিডুপ্লিকেশন (Deduplication) কীভাবে কাজ করে?\n\nঅনেকের মনে প্রশ্ন জাগতে পারে: যদি ব্রাউজার পিক্সেল এবং সার্ভার সিএপিআই দুটিই একই সময়ে ইভেন্ট পাঠায়, তবে কি ডাবল সেল কাউন্ট হবে?\nএর সমাধান হলো **Event ID**:\n- প্রতিটি অ্যাকশনের সময় একটি অনন্য আইডি তৈরি হয়।\n- ব্রাউজার এবং সার্ভার উভয়ই একই Event ID মেটাতে পাঠায়।\n- মেটা স্বয়ংক্রিয়ভাবে একটি রেখে অন্যটি বাদ দিয়ে দেয়। একেই বলে ডিডুপ্লিকেশন।\n\n---\n\n## ৩. স্ট্যান্ডার্ড ইভেন্ট ট্যাক্সোনমি\n\nএকটি প্রফেশনাল ল্যান্ডিং পেজে আমরা যেসব ইভেন্ট সুনির্দিষ্টভাবে কনফিগার করি:\n- **PageView:** পেজে প্রবেশ করা মাত্র ট্রিগার হয়।\n- **ViewContent:** গুরুত্বপূর্ণ অফার বা সেকশন দেখার সময়।\n- **Contact:** হোয়াটসঅ্যাপ বা কল বাটনে চাপ দিলে।\n- **Lead / Purchase:** ফরম সাবমিট বা সফল অর্ডার সম্পন্ন হওয়ার সময়।\n\nপ্রতিটি ইভেন্ট মেটা ইভেন্টস ম্যানেজারের টেস্ট ইভেন্ট টুলে ভেরিফাই করার পরই প্রজেক্ট হ্যান্ডওভার করা উচিত।\n','\n',char(10)),'digital-marketing','["Meta Pixel","CAPI","Tracking","Analytics"]',NULL,'published',0,'7 min read','Meta Pixel এবং Conversions API (CAPI) ট্র্যাকিং গাইড | Projukti Labs','সার্ভার-সাইড মেটা কনভার্সনস এপিআই এবং ইভেন্ট ডিডুপ্লিকেশনের মাধ্যমে বিজ্ঞাপনী ডেটা ড্রপ-অফ রোধ করার সম্পূর্ণ টেকনিক্যাল নির্দেশিকা।',NULL,1793865600000,1793865600000,1794018063646,NULL,'markdown',NULL,NULL,NULL,'Md Parvezul Islam','Principal Software Architect & Founder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'bn',1,5,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,'Article');
INSERT INTO "blog_posts" ("id","slug","title","excerpt","content","category","tags","cover_image","status","is_featured","read_time","seo_title","seo_description","scheduled_at","published_at","created_at","updated_at","subtitle","content_format","content_plain_text","category_id","author_id","author_name","author_role","image_alt","image_title","image_caption","image_credit","image_width","image_height","image_mime_type","is_pinned","allow_comments","editorial_notes","language","version","reading_time_minutes","word_count","character_count","heading_count","paragraph_count","table_of_contents","last_content_analysis_at","last_saved_at","canonical_url","focus_keyword","secondary_keywords","robots_index","robots_follow","og_title","og_description","og_image","twitter_title","twitter_description","twitter_image","structured_data_type") VALUES('post_05','why-website-maintenance-is-essential','Website Launch-এর পর নিয়মিত Maintenance ও সিকিউরিটি প্যাচিং কেন প্রয়োজন?','ওয়েবসাইট একবার বানিয়ে ছেড়ে দিলে কি নিরাপদ থাকে? জানুন কেন রুটিন ব্যাকআপ, আপটাইম মনিটরিং এবং ফ্রেমওয়ার্ক সিকিউরিটি আপডেট ব্যবসার ধারাবাহিকতার জন্য জরুরি।',replace('\n## ভূমিকা: সফটওয়্যার একটি জীবন্ত সিস্টেম\n\nএকটি নতুন গাড়ি কেনার পর যেমন নিয়মিত ইঞ্জিন অয়েল পরিবর্তন ও রক্ষণাবেক্ষণ করতে হয়, একটি আধুনিক ওয়েবসাইট বা ই-কমার্স অ্যাপ্লিকেশনের ক্ষেত্রেও ঠিক একই নিয়ম প্রযোজ্য।\n\nইন্টারনেট কখনো থেমে থাকে না। ব্রাউজারগুলো নিয়মিত আপডেট হচ্ছে, থার্ড-পার্টি এপিআই পরিবর্তিত হচ্ছে এবং নতুন নতুন সাইবার হুমকি প্রতিদিন তৈরি হচ্ছে।\n\n---\n\n## ১. নিরাপত্তা আপডেট ও ভালনারেবিলিটি প্রতিরোধ\n\nআধুনিক ওয়েব ফ্রেমওয়ার্কগুলো বিভিন্ন ওপেন সোর্স প্যাকেজ ও লাইব্রেরির ওপর ভিত্তি করে কাজ করে। প্রায়শই পুরোনো ভার্সনে নিরাপত্তা ত্রুটি (CVE Vulnerabilities) ধরা পড়ে।\nযদি নিয়মিত সিকিউরিটি প্যাচ ইনস্টল না করা হয়, তবে হ্যাকাররা সাইটের ডেটাবেইজে অনুপ্রবেশ করতে পারে কিংবা স্প্যাম রিডাইরেক্ট কোড ইনজেক্ট করতে পারে।\n\n---\n\n## ২. অফ-সাইট ব্যাকআপ ও ডিজাস্টার রিকভারি ড্রিল\n\nসার্ভার ক্র্যাশ বা অনাকাঙ্ক্ষিত প্রযুক্তিগত বিপর্যয়ের হাত থেকে বাঁচার একমাত্র রক্ষাকবচ হলো নিয়মিত ব্যাকআপ।\nতবে শুধু ব্যাকআপ নিয়ে রাখাই যথেষ্ট নয়; সেই ব্যাকআপ থেকে সাইটকে পুনরায় সফলভাবে চালু করা যায় কি না—তার **রিকভারি ড্রিল (Restoration Drill)** যাচাই করা অপরিহার্য।\n\n---\n\n## ৩. আপটাইম মনিটরিং ও তাৎক্ষণিক অ্যালার্ট\n\nআপনার সাইট ডাউন হয়ে গেলে যদি আপনি কাস্টমারের কাছ থেকে ফোন পেয়ে জানতে পারেন, তবে বুঝতে হবে আপনার সিস্টেমে রিয়েল-টাইম মনিটরিং নেই।\n৫ মিনিট অন্তর স্বয়ংক্রিয় প্রব পাঠিয়ে সাইটের স্ট্যাটাস চেক করা এবং কোনো অসঙ্গতি ধরা পড়লে ইঞ্জিনিয়ারদের কাছে তাৎক্ষণিক এসএমএস বা হোয়াটসঅ্যাপ অ্যালার্ট পাঠানোই পেশাদার রক্ষণাবেক্ষণের মূল কাজ।\n\n---\n\n## ৪. ধারাবাহিক সাপোর্ট ও ডেডিকেটেড ডেভেলপার সময়\n\nপ্রতি মাসেই ছোটখাটো পরিবর্তন দরকার হতে পারে—যেমন নতুন অফার ব্যানার যোগ করা, ফোন নম্বর পরিবর্তন করা, কিংবা ক্যাম্পেইনের জন্য ছোট ফরম আপডেট। \nএকটি মানসম্মত মাসিক কেয়ার রিটেইনারে থাকলে আলাদা করে প্রতিবার নতুন ডেভেলপার খোঁজার ঝামেলা থাকে না।\n','\n',char(10)),'business-tech','["Maintenance","Security","Uptime","SLA"]',NULL,'published',0,'5 min read','Website Maintenance ও সিকিউরিটি সাপোর্ট গাইড | Projukti Labs','ওয়েবসাইট সুরক্ষায় নিয়মিত অফ-সাইট ব্যাকআপ, আপটাইম টেলিমেট্রি এবং ডিপেনডেন্সি সিকিউরিটি আপডেটের গুরুত্ব।',NULL,1793930400000,1793930400000,1794018063647,NULL,'markdown',NULL,NULL,NULL,'Md Parvezul Islam','Principal Software Architect & Founder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'bn',1,5,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,'Article');
CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`company_name` text,
	`country` text DEFAULT 'Bangladesh',
	`status` text DEFAULT 'lead' NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
CREATE TABLE `faqs` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`updated_at` integer NOT NULL
);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_01','Project Scoping & Quotations','How do you scope projects and determine costs?','For productized offerings—such as our Landing Page with Meta Pixel, Complete E-commerce Website, and Maintenance Retainers—we provide defined deliverables and transparent fixed pricing tiers. For custom web applications, we analyze your functional and technical requirements upfront to provide a detailed Scope of Work (SOW) and milestone-based quotation before any contract is signed.',1,1,1794018063644);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_02','Project Scoping & Quotations','Who writes the code and manages project architecture?','All systems are directly architected and engineered by our in-house engineering team under the leadership of Founder & Principal Software Architect Md Parvezul Islam. We do not subcontract client projects to unknown third parties or unverified freelancers.',2,1,1794018063644);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_03','Project Scoping & Quotations','How can I track progress during project development?','We maintain direct communication via your preferred professional channel (WhatsApp, Slack, or Email) with regular milestone updates. You receive a private staging URL to review live builds and test functionality in real browsers before deployment.',3,1,1794018063645);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_04','Technical Architecture & Performance','Why do you build with Next.js and modern edge runtimes instead of generic templates?','Traditional template-heavy sites frequently suffer from plugin bloat, slow mobile load times (3–6 seconds), high vulnerability risks, and frequent crashes under traffic spikes. We build clean, modular web platforms with Next.js App Router, React, TypeScript, and edge cloud runtimes that achieve sub-second page loads, tight type-safety, and robust security.',4,1,1794018063645);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_05','Technical Architecture & Performance','What is the difference between browser Meta Pixel and server-side Conversions API (CAPI)?','Browser Meta Pixel alone misses 20% to 40% of conversion data due to ad-blockers, iOS privacy protections, and unstable mobile connections. Our dual-layer solution dispatches matching unique Event IDs from both the client browser and the edge server. Meta deduplicates matching events, giving your ad campaigns accurate data, better audience targeting, and lower cost-per-acquisition.',5,1,1794018063645);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_06','E-commerce & Payment Gateways','Which payment gateways do you integrate for online stores?','For Bangladesh-focused stores, we integrate direct merchant accounts for bKash PGW, Nagad, and SSLCommerz. For international trade, we support Stripe (credit/debit cards). All funds settle directly into your verified merchant accounts with 0% studio commissions or per-order royalties.',6,1,1794018063645);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_07','Code Ownership & Security','Who owns the source code and database upon project completion?','You do. Upon final project settlement, 100% of the repository source code, cloud configuration scripts, database schema, and technical documentation are transferred to your organization. Projukti Labs enforces zero vendor lock-in.',7,1,1794018063645);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793955182315','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793955182315);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793955413042','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793955413042);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793955551082','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793955551082);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793956964226','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793956964226);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_08','Maintenance & Technical Support','What ongoing support is provided after launch?','Every new website and e-commerce project includes a complimentary 14-to-30-day post-launch technical warranty to resolve initial bugs. Afterwards, clients can subscribe to our monthly Maintenance Retainers (Basic Care, Business Care, Priority Care) for ongoing uptime monitoring, security patching, off-site backups, and dedicated developer hours.',8,1,1794018063645);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793959245099','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793959245099);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793959309890','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793959309890);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793959369047','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793959369047);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793959510876','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793959510876);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1793959532846','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1793959532846);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794017631683','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794017631683);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794018029848','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794018029848);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794018075096','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794018075096);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794018152027','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794018152027);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794018651234','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794018651234);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794020127401','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794020127401);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794020894178','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794020894178);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794021116722','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794021116722);
INSERT INTO "faqs" ("id","category","question","answer","sort_order","is_active","updated_at") VALUES('faq_test_1794021591043','টেস্ট ক্যাটাগরি','টেস্ট প্রশ্ন?','টেস্ট উত্তর।',99,1,1794021591043);
CREATE TABLE `internal_notes` (
	`id` text PRIMARY KEY NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`author_id` text,
	`author_name` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL
);
CREATE TABLE `media_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`file_name` text NOT NULL,
	`file_size` integer NOT NULL,
	`mime_type` text NOT NULL,
	`url` text NOT NULL,
	`alt_text` text,
	`category` text DEFAULT 'general',
	`uploaded_by` text,
	`created_at` integer NOT NULL
);
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`type` text DEFAULT 'info' NOT NULL,
	`action_url` text,
	`is_read` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
CREATE TABLE `page_sections` (
	`id` text PRIMARY KEY NOT NULL,
	`page_slug` text NOT NULL,
	`section_key` text NOT NULL,
	`title` text,
	`subtitle` text,
	`content` text,
	`is_active` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_home_hero','home','hero','Build Your Digital Future with Projukti Labs.','We design and develop modern websites, e-commerce platforms and custom digital solutions that help businesses move forward.','{"eyebrow":"PROFESSIONAL DIGITAL SOLUTIONS","badge":"PROFESSIONAL DIGITAL SOLUTIONS","supportingLine":"From business websites to complete digital commerce solutions.","ctaPrimaryText":"Start a Project","ctaPrimaryLink":"/get-a-quote","ctaSecondaryText":"Explore Our Work","ctaSecondaryLink":"/portfolio"}',1,1,1794018063635);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_home_metrics','home','metrics','ইঞ্জিনিয়ারিং বেঞ্চমার্ক ও পারফরম্যান্স','কোনো ফাঁকা প্রতিশ্রুতি নয়—আমাদের প্রতিটি সিস্টেম নিখুঁত কারিগরি মেট্রিক্স ও স্ট্যান্ডার্ড মেনে নির্মিত।','{"metrics":[{"label":"মোবাইল LCP স্পিড","value":"< ১.২s"},{"label":"টাইপ সেফটি","value":"১০০%"},{"label":"গ্লোবাল এজ নেটওয়ার্ক","value":"৩০০+ PoPs"},{"label":"এক্সেসিবিলিটি","value":"WCAG 2.1"}]}',1,2,1793953464282);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_test_suite_01','test-page','intro','টেস্ট সেকশন শিরোনাম','টেস্ট সেকশন সাবটাইটেল','{"note":"test"}',1,1,1794021591039);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_home_intro','home','intro','Technology Built Around Your Business.','Every business has different goals. We focus on understanding your requirements and building digital solutions that fit the way you work.','{"pillars":[{"title":"Thoughtful Design","description":"Clean, responsive user interfaces that represent your brand properly and feel natural across all devices."},{"title":"Reliable Engineering","description":"Built on modern, type-safe foundations like Next.js, React, and structured relational databases for long-term stability."},{"title":"Practical Solutions","description":"We focus on solving real operational problems and driving verified business outcomes without unnecessary complexity."}]}',1,2,1794018063635);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_home_services','home','services','What We Do','Practical digital services for businesses, entrepreneurs and growing brands.','{"categoriesCount":3}',1,3,1794018063635);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_home_projects','home','projects','Selected Projects','Explore software products and digital platforms developed through practical engineering and continuous improvement.','{"note":"Truthfully categorized with verified ownership, architecture, and live operational status."}',1,4,1794018063635);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_home_why_us','home','why_us','Why Work With Us','Direct collaboration with senior engineers, clean architecture, and practical digital solutions designed for real business growth.','{"reasons":[{"title":"Business-focused development","description":"We align software architecture with your business model, customer workflows, and measurable objectives."},{"title":"Modern technology","description":"High-performance applications built with Next.js, React, TypeScript, and edge cloud infrastructure."},{"title":"Responsive design","description":"Layouts engineered from 320px mobile viewports up to ultrawide desktop screens with zero layout shifts."},{"title":"Practical solutions","description":"We prioritize features you actually need, eliminating bloated dependencies and artificial complexity."},{"title":"Clear communication","description":"Direct collaboration with the software architect building your project, without agency account managers."},{"title":"Maintainable architecture","description":"Clean codebases, type-safe API contracts, and structured databases that your business owns completely."}]}',1,5,1794018063636);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_home_process','home','process','How We Work','A transparent, milestone-driven approach from initial discovery to deployment and ongoing support.','{"steps":[{"number":"1","name":"Discover","description":"Understand your business goals, target audience, technical requirements, and core constraints."},{"number":"2","name":"Plan","description":"Define scope, deliverable specifications, system architecture, milestones, and transparent timelines."},{"number":"3","name":"Design","description":"Build clean, intuitive user interfaces and ergonomic mobile experiences that present your offer clearly."},{"number":"4","name":"Develop","description":"Implement type-safe application code, integrate secure databases, and verify APIs thoroughly."},{"number":"5","name":"Deliver","description":"Verify cross-browser performance, configure domain hosting, and execute a smooth production launch."},{"number":"6","name":"Support","description":"Provide agreed warranty support, proactive uptime monitoring, backups, and regular technical maintenance."}]}',1,6,1794018063636);
INSERT INTO "page_sections" ("id","page_slug","section_key","title","subtitle","content","is_active","sort_order","updated_at") VALUES('sec_home_cta','home','cta','Have a Project in Mind?','Let''s discuss your idea and find the right digital solution for your business.','{"buttonText":"Discuss Your Project","buttonLink":"/get-a-quote","secondaryText":"Contact Us","secondaryLink":"/contact"}',1,7,1794018063636);
CREATE TABLE `portfolio_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`badge` text NOT NULL,
	`project_type` text NOT NULL,
	`overview` text NOT NULL,
	`metrics` text,
	`stack` text,
	`deliverables` text,
	`link_url` text,
	`link_text` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
INSERT INTO "portfolio_projects" ("id","slug","title","category","badge","project_type","overview","metrics","stack","deliverables","link_url","link_text","is_featured","sort_order","is_published","created_at","updated_at") VALUES('prj_01','unique-store-bd','Unique Store BD','E-commerce Platform','Live Platform','Founder-owned Product','An e-commerce platform designed to manage products, orders, customer experiences, and digital commerce operations for customers in Bangladesh. Architected as a single-store, single-database application with automated encrypted backups.','[{"label":"Architecture","value":"Single-store D1"},{"label":"Checkout","value":"1-Page Flow"},{"label":"Backups","value":"Encrypted R2"},{"label":"Status","value":"Live / Operational"}]','["Next.js 16 (App Router)","React 19","TypeScript","Drizzle ORM","Cloudflare D1 (SQLite)","Tailwind CSS v4","Base UI","Shadcn UI"]','["Comprehensive digital product catalog with fast category filtering and search","Frictionless single-page mobile checkout workflow tailored for local shoppers","Administrative dashboard for order management, customer records, and coupon rules","Automated off-site database backups with age-encryption to Cloudflare R2"]','https://uniquestorebd.com','View Project',1,1,1,1793953464280,1794018063642);
INSERT INTO "portfolio_projects" ("id","slug","title","category","badge","project_type","overview","metrics","stack","deliverables","link_url","link_text","is_featured","sort_order","is_published","created_at","updated_at") VALUES('prj_02','searcher-bot-premium','Searcher BOT Premium & DLM Engine','Search Engine & Developer Utility','In Development','Software Tool / Search Engine','A high-performance authorized record search and automated download management system engineered with Rust-based Tantivy indexing, zero server-side result persistence, and sub-50ms query processing.','[{"label":"Search Engine","value":"Rust Tantivy"},{"label":"P99 Latency","value":"< 50ms"},{"label":"Persistence","value":"Zero Disk Save"},{"label":"Database","value":"PostgreSQL 18"}]','["Next.js 16","FastAPI (Python 3.12)","Tantivy 0.22+ (Rust)","PostgreSQL 18","Redis 7.4","Docker Compose"]','["Rust-based Tantivy memory-mapped inverted index delivering sub-50ms query response","Zero server-side search result persistence architecture with direct client memory streaming","Multi-source asynchronous download queue and stream manager with automated verification"]','/portfolio','Technical Overview',1,2,1,1793953464281,1794018063643);
INSERT INTO "portfolio_projects" ("id","slug","title","category","badge","project_type","overview","metrics","stack","deliverables","link_url","link_text","is_featured","sort_order","is_published","created_at","updated_at") VALUES('prj_03','all-in-one-shop','All In One Shop (AIO)','E-commerce & Telegram Platform','Prototype','Founder-owned Platform','An integrated commerce platform combining a modern web storefront with an automated Telegram bot through a shared backend architecture and centralized PostgreSQL database.','[{"label":"Channels","value":"Web + Telegram"},{"label":"Database","value":"PostgreSQL 16"},{"label":"Deployment","value":"Docker / Dokploy"},{"label":"Status","value":"In Development"}]','["Next.js 16","Python Telegram Bot","PostgreSQL 16","Docker Compose","Tailwind CSS v4"]','["Centralized product catalog and order processing synchronized across web and Telegram","Asynchronous Telegram bot customer workflows for order placement and status updates","Containerized deployment environment with persistent storage and backup planning"]','/portfolio','Architecture Details',1,3,1,1793953464281,1794018063643);
INSERT INTO "portfolio_projects" ("id","slug","title","category","badge","project_type","overview","metrics","stack","deliverables","link_url","link_text","is_featured","sort_order","is_published","created_at","updated_at") VALUES('prj_04','multi-domain-checker','Multi-Domain Checker Platform','Developer Utility & Audit Suite','Prototype','Software Tool / Developer Utility','An engineering-focused platform designed for structured domain auditing, multi-target batch processing, and secure administration with role-based access control.','[{"label":"Framework","value":"FastAPI / Python"},{"label":"Audit Suite","value":"v3.0 Suite"},{"label":"Processing","value":"Batch Async"},{"label":"Access Control","value":"Strict RBAC"}]','["Python 3.12","FastAPI","Docker","Pytest","React","SQLite / Supabase"]','["Multi-target batch processing workflows with strict upload verification and record limits","Comprehensive audit logging, role-based access control, and sensitive data redaction","Tested asynchronous auditing pipeline delivering structured output and status reports"]','/portfolio','Technical Overview',1,4,1,1793953464281,1794018063643);
INSERT INTO "portfolio_projects" ("id","slug","title","category","badge","project_type","overview","metrics","stack","deliverables","link_url","link_text","is_featured","sort_order","is_published","created_at","updated_at") VALUES('prj_05','pro-access-shop','Pro Access Shop','Digital Products & Online Store','Prototype','Online Store / Digital Products','An online store platform focused on digital product delivery, automated account workflows, and responsive shopping experiences with real-time state synchronization.','[{"label":"Domain","value":"proaccess.shop"},{"label":"Stack","value":"Next.js + Mongo"},{"label":"Realtime","value":"Pusher Sockets"},{"label":"Status","value":"In Development"}]','["Next.js 16","React 19","MongoDB (Mongoose)","NextAuth","Tailwind CSS v4","Pusher"]','["Digital product fulfillment workflow and instant customer transaction notifications","Real-time state synchronization via Pusher WebSockets for live status updates","Clean administrative catalog and order management dashboard"]','/portfolio','Product Overview',0,5,1,1793959245074,1794018063644);
INSERT INTO "portfolio_projects" ("id","slug","title","category","badge","project_type","overview","metrics","stack","deliverables","link_url","link_text","is_featured","sort_order","is_published","created_at","updated_at") VALUES('prj_06','pro-access-movie','Pro Access Movie','Media Web Platform','Prototype','Experimental Media Project','A media-focused web platform project designed around content discovery, organized browsing, and a modern streaming-style user experience.','[{"label":"Interface","value":"Streaming UX"},{"label":"Backend","value":"Supabase"},{"label":"Framework","value":"Next.js App Router"},{"label":"Status","value":"In Development"}]','["Next.js App Router","Supabase","Tailwind CSS","TypeScript"]','["Media catalog exploration interface with category filtering and fast search","Modern responsive streaming-style video presentation layout with adaptive controls"]','/portfolio','Interface Overview',0,6,1,1793959245074,1794018063644);
INSERT INTO "portfolio_projects" ("id","slug","title","category","badge","project_type","overview","metrics","stack","deliverables","link_url","link_text","is_featured","sort_order","is_published","created_at","updated_at") VALUES('prj_07','dropshopnn-os','DropshopNN Enterprise Commerce OS','Commerce Software Architecture','Architecture Concept','Product Architecture Blueprint','A commerce operating system concept focused on managing multi-channel product operations, inventory workflows, and digital commerce business administration.','[{"label":"Architecture","value":"Modular Monolith"},{"label":"Scope","value":"Multi-channel OS"},{"label":"Inventory","value":"Centralized Sync"},{"label":"Status","value":"Conceptual Design"}]','["Distributed System Blueprint","Modular Microservices","High-throughput Relational DB"]','["Architectural blueprints for high-volume catalog processing and multi-vendor models","Order lifecycle state machines and centralized multi-warehouse inventory sync","Enterprise multi-feature commerce workflow and audit specifications"]','/portfolio','Blueprint Summary',0,7,1,1793959245074,1794018063644);
CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`quote_number` text NOT NULL,
	`lead_id` text,
	`client_name` text NOT NULL,
	`client_email` text NOT NULL,
	`client_phone` text,
	`client_company` text,
	`service_id` text,
	`package_id` text,
	`items` text NOT NULL,
	`total_bdt` integer NOT NULL,
	`total_usd` integer,
	`status` text DEFAULT 'draft' NOT NULL,
	`valid_until` integer NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
CREATE TABLE `service_packages` (
	`id` text PRIMARY KEY NOT NULL,
	`service_id` text NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`price_bdt` integer,
	`price_usd` integer,
	`billing_period` text DEFAULT 'one-time',
	`description` text NOT NULL,
	`is_popular` integer DEFAULT false NOT NULL,
	`sla_hours` integer,
	`deliverables` text,
	`exclusions` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_lp_starter','srv_landing_page_meta_pixel','launch-sprint','Launch Sprint',25000,250,'one-time','Fast-to-market conversion landing page with core sections and standard Meta Pixel event tracking.',0,NULL,'["Up to 5 content sections (Hero, Features, Why Us, FAQs, Lead Capture)","Browser Meta Pixel PageView and Lead event integration","Mobile speed optimization and clean responsive design","Database and email lead capture storage","7 business days delivery"]','["Server-side CAPI deduplication","Custom video background processing"]',0,1794018063637);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_lp_pro','srv_landing_page_meta_pixel','conversion-pro','Conversion Pro',45000,450,'one-time','Full-funnel landing page with dual Meta Pixel + CAPI deduplication and GA4 enhanced measurement.',1,NULL,'["Up to 8 tailored sections with interactive tabs, testimonials, and accordion FAQs","Dual browser Meta Pixel and server-side Conversions API (CAPI) deduplication","GA4 enhanced measurement (scroll depth, outbound clicks, form abandonment)","Live verification report in Meta Events Manager test console","Lead capture with email notifications and reference tracking codes","10 business days delivery"]','["Advertising media budget"]',0,1794018063638);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_lp_scale','srv_landing_page_meta_pixel','growth-funnel-suite','Growth Funnel Suite',75000,750,'one-time','Advanced funnel system with multi-step interactive workflows, CRM pipelines, and multi-channel telemetry.',0,NULL,'["Multi-step interactive lead quiz or pricing calculator component","Meta Pixel, CAPI, Google Ads Tag, and TikTok Pixel integration","Direct CRM pipeline integration with automatic Slack/WhatsApp/Email notifications","Advanced Core Web Vitals optimization (>95 mobile score benchmark)","14 business days delivery with 30-day extended monitoring"]','["Advertising media budget"]',0,1794018063638);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_corp_starter','srv_corporate_website','company-standard','Company Standard',60000,600,'one-time','Essential professional web presence for service firms, consultancies, and established studios.',0,NULL,'["Up to 6 custom pages with responsive layouts","Inquiry capture system with email alerts","Complete technical SEO and structured data setup","Mobile-first responsive architecture"]','["Multi-language localization"]',0,1794018063639);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_corp_scale','srv_corporate_website','enterprise-studio','Enterprise Studio',120000,1200,'one-time','Comprehensive corporate platform with dynamic case study engine, career portal, and content management.',0,NULL,'["Up to 15 custom pages with modular components","Blog CMS and portfolio case study system","Custom career application or quotation workflows","High-speed edge performance optimization"]','["Custom internal ERP or intranet portal integration"]',0,1794018063639);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_ecom_starter','srv_complete_ecommerce','commerce-starter','Commerce Starter',65000,650,'one-time','Essential online store for boutique brands and single-category retail shops.',0,NULL,'["Up to 100 products catalog capacity","bKash / Nagad or SSLCommerz payment gateway integration","Admin order management with automated invoice generation","Mobile-first optimized shopping cart and checkout","14 business days delivery"]','["Multi-currency international switching","Automated courier dispatch API"]',0,1794018063639);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_ecom_growth','srv_complete_ecommerce','growth-storefront','Growth Storefront',110000,1100,'one-time','Complete commerce engine with multi-gateway payments, discount rules, and automated courier sync.',1,NULL,'["Unlimited product catalog with multi-variant options (size, color, specifications)","Multiple payment gateways: SSLCommerz, bKash PGW, and Stripe","Automated courier API integration (Pathao / Steadfast parcel dispatch)","Discount coupons, promotional rules, and customer order history portal","E-commerce GA4 and Meta Pixel Purchase event telemetry","21 business days delivery"]','["Multi-vendor marketplace payout engine"]',0,1794018063640);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_ecom_scale','srv_complete_ecommerce','custom-scale-commerce','Custom Scale Commerce',180000,1800,'one-time','High-volume commerce architecture with edge caching, custom synchronization, and multi-warehouse support.',0,NULL,'["High-concurrency custom checkout engine with edge caching","Dual currency (BDT and USD) with automatic geolocation currency switcher","Custom warehouse and external inventory synchronization APIs","Comprehensive analytics dashboard and executive reporting system","30 business days delivery with dedicated staging testing period"]','["Physical warehouse hardware setup"]',0,1794018063640);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_headless_pro','srv_headless_commerce','digital-delivery-suite','Digital Delivery Suite',95000,950,'one-time','Modern digital commerce storefront with automated instant product delivery upon verified payment.',0,NULL,'["Custom Next.js digital storefront","Instant delivery workflow","Product license manager","14 business days delivery"]','["External licensing server hosting fees"]',0,1794018063640);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_maint_basic','srv_website_maintenance','basic-care','Basic Care',8000,80,'monthly','Essential baseline protection to keep your website online, secure, and reliably backed up.',0,48,'["Weekly off-site backup with integrity verification","15-minute interval uptime and SSL certificate monitoring","Monthly core dependency security updates","Emergency incident triage (48-hour SLA response)","Monthly health status email summary"]','["Dedicated development hours","Same-day emergency support"]',0,1794018063641);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_maint_business','srv_website_maintenance','business-care','Business Care',18000,180,'monthly','Proactive maintenance and regular developer hours for growing commercial websites and online stores.',1,24,'["Daily database backups and weekly verification checks","5-minute uptime monitoring with instant WhatsApp and email alerts","4 dedicated developer hours each month for UI tweaks and content updates","Monthly performance audit and database optimization","24-hour SLA response time for non-critical tickets","Detailed monthly technical report"]','["Dedicated on-call full-time engineer"]',0,1794018063641);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_maint_priority','srv_website_maintenance','priority-care','Priority Care',38000,380,'monthly','Mission-critical engineering support and fast turnaround for high-traffic portals and e-commerce stores.',0,4,'["10 dedicated senior developer hours each month","4-hour emergency SLA with direct phone and WhatsApp channel","Pre-deployment testing in dedicated staging environments","Continuous security audits and secret rotation assistance","Database indexing and CDN edge cache tuning","Bi-weekly engineering check-in calls"]','["Full-team dedicated staff augmentation"]',0,1794018063641);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_maint_custom','srv_website_maintenance','custom-retainer','Custom Retainer',NULL,NULL,'custom','Bespoke SLA, dedicated capacity, and direct architectural consulting for large platforms.',0,1,'["Flexible monthly engineering capacity (20+ hours)","1-hour critical response SLA with 24/7 emergency escalation","Direct communication channel with Principal Software Architect (Slack / WhatsApp)","Multi-region failover planning and disaster recovery drills","Custom cloud infrastructure and CI/CD pipeline management"]','[]',0,1794018063642);
INSERT INTO "service_packages" ("id","service_id","slug","name","price_bdt","price_usd","billing_period","description","is_popular","sla_hours","deliverables","exclusions","sort_order","updated_at") VALUES('pkg_audit_oneoff','srv_speed_security_audit','deep-audit-and-fix','Deep Audit & Fix',30000,300,'one-time','Complete sprint to enhance website speed and reinforce overall infrastructure security.',0,NULL,'["Full site profiling and audit","Direct code-level remediation","Security header implementation","Performance improvement verification"]','["Complete backend rewrite"]',0,1794018063642);
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`category_slug` text NOT NULL,
	`name` text NOT NULL,
	`tagline` text,
	`description` text NOT NULL,
	`is_flagship` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`deliverables` text,
	`exclusions` text,
	`technical_highlights` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
INSERT INTO "services" ("id","slug","category_slug","name","tagline","description","is_flagship","status","sort_order","deliverables","exclusions","technical_highlights","created_at","updated_at") VALUES('srv_landing_page_meta_pixel','landing-page-meta-pixel','web-development','Landing Page with Meta Pixel','Launch a focused landing page designed to present your offer clearly, guide visitors toward action and support Meta Pixel-based marketing measurement.','A high-speed, conversion-focused landing page built with clean responsive design and dual-layer Meta Pixel + Conversions API (CAPI) event tracking so your advertising campaigns receive accurate, deduplicated event data.',1,'active',0,'["Custom conversion-engineered single-page layout with high-impact hero structure","Complete Meta Pixel and Conversions API (CAPI) setup on your verified business account","Google Analytics 4 enhanced event tracking and scroll depth measurement","Fluid responsive design across mobile (320px+), tablet, and desktop viewports","Bot-protected lead capture form with instant email and webhook notification routing","Technical SEO foundation: Open Graph tags, JSON-LD structured data, sitemap, and robots.txt","14-day post-launch event tracking verification and technical warranty support"]','["Advertising media spend (payable directly to Meta or Google)","Custom on-site photography or video production shoots","Ongoing weekly ad campaign management (setup and verification included)","Complex multi-tier backend portals (covered under custom web application scope)"]','["Target mobile LCP under 1.2s on 4G cellular networks with zero layout shift","Dual-layer browser Meta Pixel and server-side Conversions API (CAPI) event deduplication","Standardized event schema: PageView, ViewContent, Contact, Lead, and Schedule","Pre-handover verification in Meta Events Manager test events console","Responsive mobile ergonomics with strict 44x44px touch target compliance"]',1793953464272,1794018063637);
INSERT INTO "services" ("id","slug","category_slug","name","tagline","description","is_flagship","status","sort_order","deliverables","exclusions","technical_highlights","created_at","updated_at") VALUES('srv_corporate_website','corporate-website','web-development','Business Website Development','Custom multi-page web platforms built for speed, SEO, and long-term brand credibility.','Professional multi-page business websites for growing companies, agencies, and consultancies. Built with Next.js App Router and semantic design tokens for effortless maintenance and search visibility.',0,'active',0,'["Complete multi-page website (Home, About, Services, Case Studies, Contact)","Easy-to-use content management for services, articles, and portfolio entries","Dynamic inquiry routing with persistent database storage","Automated XML sitemap, robots.txt, and Google Search Console configuration"]','["Proprietary third-party CMS licensing fees","Specialized technical research copywriting from scratch"]','["Edge SSR / SSG hybrid caching for instant page delivery worldwide","Automated blog, case study, and announcement publishing workflow","WCAG 2.1 AA accessible navigation, form controls, and color contrast"]',1793953464273,1794018063638);
INSERT INTO "services" ("id","slug","category_slug","name","tagline","description","is_flagship","status","sort_order","deliverables","exclusions","technical_highlights","created_at","updated_at") VALUES('srv_complete_ecommerce','complete-ecommerce-website','ecommerce','Complete E-commerce Website','A complete e-commerce website built around your business requirements, with product management, customer-facing shopping features, order workflows and an administrative control panel.','A full-featured online store tailored to your brand, featuring rapid product browsing, optimistic cart updates, single-page mobile checkouts, local payment gateways (bKash PGW, Nagad, SSLCommerz) and international processing (Stripe), and complete admin order management.',1,'active',0,'["Modern responsive storefront: product catalog, category navigation, filtering, and quick view","Frictionless checkout with guest checkout and address auto-save","Payment gateway integration: bKash PGW, Nagad, SSLCommerz, and Stripe","Administrative commerce dashboard: orders, products, inventory, coupons, and reports","Transactional notifications for order placed, paid, shipped, and delivered states","E-commerce Meta Pixel and GA4 standard Purchase event tracking","30-day post-launch technical warranty and complete handover documentation"]','["Payment gateway per-transaction fees (payable directly to bKash / SSLCommerz / Stripe)","Third-party bulk SMS bundle charges (payable to your SMS gateway provider)","Manual data entry for more than 50 products (bulk CSV import tool provided)","Courier API account registration fees (Pathao / Steadfast merchant accounts)"]','["Sub-100ms instant cart updates using optimistic UI state management","Direct merchant account payment integrations: bKash PGW, Nagad, SSLCommerz, and Stripe","Real-time order validation, inventory reservation, and fraud prevention safeguards","Automated transactional SMS and email confirmations with reference tracking codes","0% studio sales commissions (no hidden per-order fees or percentage deductions)"]',1793953464274,1794018063639);
INSERT INTO "services" ("id","slug","category_slug","name","tagline","description","is_flagship","status","sort_order","deliverables","exclusions","technical_highlights","created_at","updated_at") VALUES('srv_headless_commerce','headless-commerce','ecommerce','Digital Product Store','Dedicated commerce platforms for digital products, software access, and automated delivery.','Fast storefronts tailored for digital product delivery, digital licenses, subscription management, and instant access workflows.',0,'active',0,'["Custom digital product catalog and instant fulfillment workflows","Dynamic product search and faceted filtering","Automated account provisioning and transaction email receipts"]','["Third-party SaaS API subscription costs"]','["Zero-latency edge page rendering with incremental static regeneration","Automated instant delivery of keys, credentials, or downloadable assets upon payment"]',1793953464274,1794018063640);
INSERT INTO "services" ("id","slug","category_slug","name","tagline","description","is_flagship","status","sort_order","deliverables","exclusions","technical_highlights","created_at","updated_at") VALUES('srv_website_maintenance','website-maintenance','maintenance-support','Website Maintenance','Practical website maintenance and technical support to help keep your existing website updated, stable and easier to manage.','A structured monthly engineering retainer providing continuous uptime monitoring, automated off-site database backups, security patching, and dedicated developer hours for routine adjustments and new features.',1,'active',0,'["Automated off-site database backups with periodic restoration drills","Next.js, Node.js, and dependency security update management","24/7 automated site uptime and error monitoring","Dedicated developer hours each month for UI tweaks, content updates, and features","Monthly executive health, security, and performance report","Priority emergency bug-fixing support matching your plan''s SLA"]','["Complete architectural redesign of the website (quoted as a separate project)","Unused monthly developer hours do not roll over beyond 60 days","Third-party server and SaaS subscription fees (payable to your provider)","Copywriting or branding from scratch (asset formatting and publishing included)"]','["Continuous uptime and SSL certificate validity monitoring with automated alerts","Automated off-site database snapshots and static asset backup retention","Security patch verification in staging before production deployment","Regular Core Web Vitals profiling to prevent performance regressions","Guaranteed SLA response time tiers according to your plan"]',1793953464275,1794018063641);
INSERT INTO "services" ("id","slug","category_slug","name","tagline","description","is_flagship","status","sort_order","deliverables","exclusions","technical_highlights","created_at","updated_at") VALUES('srv_speed_security_audit','speed-security-audit','maintenance-support','Performance & Security Audit','Core Web Vitals profiling, security headers, and edge caching optimization.','A comprehensive one-off audit and remediation sprint to diagnose slow page loads, security vulnerabilities, and tracking errors.',0,'active',0,'["Comprehensive 20+ point audit report with before-and-after benchmarks","Direct code remediation for bundle splitting and asset caching","Edge cache rules setup and modern image optimization pipeline"]','["Hosting provider server hardware replacement fees"]','["Chrome DevTools trace analysis and JavaScript bundle optimization","Content Security Policy (CSP), HSTS, and CORS security header hardening"]',1793953464275,1794018063642);
CREATE TABLE `site_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`updated_at` integer NOT NULL
);
INSERT INTO "site_settings" ("id","key","value","updated_at") VALUES('set_general','general','{"siteName":"Projukti Labs","tagline":"Building Digital Solutions. Engineering the Future.","description":"Projukti Labs is a technology-focused digital solutions studio building modern websites, e-commerce platforms, and practical software solutions.","contactEmail":"contact@projuktilabs.tech","founder":"Md Parvezul Islam","founderRole":"Founder & Principal Software Architect","address":"Dhaka, Bangladesh","currency":"BDT","timezone":"Asia/Dhaka","maintenanceMode":false}',1794018063633);
INSERT INTO "site_settings" ("id","key","value","updated_at") VALUES('set_seo','seo','{"titleTemplate":"%s | Projukti Labs","defaultTitle":"Projukti Labs | Building Digital Solutions. Engineering the Future.","defaultDescription":"We design and develop modern websites, e-commerce platforms and custom digital solutions that help businesses move forward.","canonicalDomain":"https://projuktilabs.tech","ogImage":"/og-image.png","enableSitemap":true}',1794018063634);
INSERT INTO "site_settings" ("id","key","value","updated_at") VALUES('set_notifications','notifications','{"emailAlertsEnabled":false,"adminAlertEmail":"contact@projuktilabs.tech","inquiryAlerts":true,"leadAlerts":true}',1794018063634);
INSERT INTO "site_settings" ("id","key","value","updated_at") VALUES('set_test_suite_key','test_suite_key','{"runAt":"2026-11-07T03:19:51.038Z","version":"1.0.0"}',1794021591038);
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
CREATE TABLE `blog_tags` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL
);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('d1_migrations',4);
CREATE UNIQUE INDEX `inquiries_reference_code_unique` ON `inquiries` (`reference_code`);
CREATE UNIQUE INDEX `admin_sessions_token_hash_unique` ON `admin_sessions` (`token_hash`);
CREATE UNIQUE INDEX `admin_users_email_unique` ON `admin_users` (`email`);
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);
CREATE UNIQUE INDEX `customers_email_unique` ON `customers` (`email`);
CREATE UNIQUE INDEX `portfolio_projects_slug_unique` ON `portfolio_projects` (`slug`);
CREATE UNIQUE INDEX `quotes_quote_number_unique` ON `quotes` (`quote_number`);
CREATE UNIQUE INDEX `services_slug_unique` ON `services` (`slug`);
CREATE UNIQUE INDEX `site_settings_key_unique` ON `site_settings` (`key`);
CREATE UNIQUE INDEX `blog_categories_slug_unique` ON `blog_categories` (`slug`);
CREATE UNIQUE INDEX `blog_tags_slug_unique` ON `blog_tags` (`slug`);
