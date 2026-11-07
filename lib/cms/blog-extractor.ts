/**
 * Projukti Labs Blog CMS — Smart Content Extraction Engine
 * Complies with Phase 17 Stage 7 (Smart Content Extraction Engine).
 * Zero-dependency, deterministic extraction for HTML, Markdown, and plain text.
 */

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ExtractedMetadata {
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  plainText: string;
  wordCount: number;
  characterCount: number;
  readingTimeMinutes: number;
  headingCount: number;
  paragraphCount: number;
  tableOfContents: TocItem[];
  suggestedTags: string[];
  suggestedCategory: {
    slug: string;
    name: string;
    confidence: "high" | "medium" | "low";
  };
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
  multipleH1Warning: boolean;
}

const CATEGORY_KEYWORDS: Record<string, { name: string; keywords: string[] }> = {
  "web-development": {
    name: "Web Development",
    keywords: [
      "next.js", "react", "typescript", "javascript", "tailwind", "api", "architecture",
      "full-stack", "cloudflare", "workers", "backend", "frontend", "server", "database",
      "d1", "drizzle", "orm", "node", "ui", "ux", "ওয়েব", "ডেভেলপমেন্ট"
    ]
  },
  "ecommerce": {
    name: "E-commerce",
    keywords: [
      "ecommerce", "e-commerce", "bkash", "nagad", "sslcommerz", "pathao", "courier",
      "cart", "checkout", "payment", "online shop", "store", "product", "order",
      "ই-কমার্স", "পেমেন্ট", "বিকাশ", "নগদ", "অর্ডার"
    ]
  },
  "digital-marketing": {
    name: "Digital Marketing & Tracking",
    keywords: [
      "meta pixel", "conversions api", "capi", "facebook ads", "google analytics", "ga4",
      "tag manager", "tracking", "conversion", "roi", "ad spend", "analytics",
      "মার্কেটিং", "ট্র্যাকিং", "পিক্সেল", "বিজ্ঞাপন"
    ]
  },
  "website-performance": {
    name: "Website Performance",
    keywords: [
      "core web vitals", "lcp", "cls", "fid", "inp", "speed", "performance", "cdn",
      "caching", "optimization", "loading", "latency", "lighthouse", "স্পিড", "পারফরম্যান্স"
    ]
  },
  "business-tech": {
    name: "Business Technology",
    keywords: [
      "business", "strategy", "maintenance", "security", "backup", "roi", "scalability",
      "software", "consulting", "growth", "automation", "ব্যবসা", "মেইনটেন্যান্স", "সিকিউরিটি"
    ]
  }
};

const COMMON_TECH_TAGS = [
  "Web Development", "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Cloudflare", "E-commerce", "bKash Integration", "Online Store",
  "Digital Marketing", "Meta Pixel", "Conversions API", "Google Analytics",
  "Core Web Vitals", "Website Speed", "SEO", "Performance",
  "Software Architecture", "Security", "Maintenance", "Automation",
  "Bangladesh Tech", "Business Growth"
];

/**
 * Normalizes text to a clean URL slug.
 * Handles English and phonetic/transliterated Bangla deterministically.
 */
export function generateCleanSlug(text: string, existingSlugs: string[] = [], maxWords = 7): string {
  if (!text) return "article-" + Date.now();

  // Strip html or markdown
  let clean = text.replace(/<[^>]*>/g, "").replace(/[#*_`[\]]/g, "").trim().toLowerCase();

  // Replace Bangla numbers with English digits
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  for (let i = 0; i < 10; i++) {
    clean = clean.replaceAll(bnDigits[i], String(i));
  }

  // Transliterate common Bengali tech & commerce terms to Latin slug equivalents
  const bnToEnMap: Record<string, string> = {
    "ওয়েবসাইট": "website",
    "ওয়েবসাইট": "website",
    "ওয়েব": "web",
    "ওয়েব": "web",
    "ব্যবসা": "business",
    "ব্যবসার": "business",
    "জন্য": "for",
    "প্রফেশনাল": "professional",
    "ই-কমার্স": "ecommerce",
    "অনলাইন": "online",
    "স্পিড": "speed",
    "পারফরম্যান্স": "performance",
    "মার্কেটিং": "marketing",
    "ট্র্যাকিং": "tracking",
    "পিক্সেল": "pixel",
    "সিকিউরিটি": "security",
    "মেইনটেন্যান্স": "maintenance",
    "গাইড": "guide",
    "কেন": "why",
    "কীভাবে": "how",
    "সফল": "successful",
    "প্রয়োজন": "essential",
    "প্রয়োজন": "essential",
    "ডিজিটাল": "digital",
    "সল্যুশন": "solution",
    "ফেসবুক": "facebook",
    "ইনবক্স": "inbox",
    "সেলস": "sales",
    "সেল": "sales",
    "মাস্টারক্লাস": "masterclass",
    "মেসেজ": "message",
    "অর্ডার": "order",
    "অর্ডারগুলো": "orders",
    "কাস্টমার": "customer",
    "গ্রাহক": "customer",
    "পাবেন": "get",
    "বেশি": "more",
    "কম": "less",
    "সাধারণ": "simple",
    "ক্যাম্পেইন": "campaign",
    "বিজ্ঞাপন": "ads",
    "কনভার্সন": "conversion",
    "বিক্রি": "sales",
    "পেজ": "page",
    "গ্রোথ": "growth",
    "স্ট্র্যাটেজি": "strategy",
    "টিপস": "tips",
    "ট্রিকস": "tricks",
    "কনভার্ট": "convert",
    "লিড": "lead",
    "লিডস": "leads",
    "ল্যান্ডিং": "landing",
    "স্টোর": "store",
    "দোকান": "shop",
    "পেমেন্ট": "payment",
    "গেটওয়ে": "gateway",
    "বিকাশ": "bkash",
    "নগদ": "nagad",
    "রকেট": "rocket",
    "কুরিয়ার": "courier",
    "ডেলিভারি": "delivery",
    "প্যাকেজ": "package",
    "মূল্য": "price",
    "খরচ": "cost",
    "বাজেট": "budget",
    "আইটি": "it",
    "সফটওয়্যার": "software",
    "এজেন্সি": "agency",
    "স্টুডিও": "studio",
    "ক্লাউড": "cloud",
    "সার্ভার": "server",
    "ডাটাবেস": "database",
    "এপিআই": "api",
    "থেকে": "from",
    "কী": "what",
    "কি": "what",
    "করবেন": "do",
    "উপায়": "ways"
  };

  for (const [bnWord, enWord] of Object.entries(bnToEnMap)) {
    clean = clean.replaceAll(bnWord, enWord);
  }

  // Convert non-alphanumeric chars (excluding Bangla unicode if needed) to hyphens
  let slug = clean
    .replace(/[^a-z0-9\u0980-\u09FF]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  // If slug contains purely Bangla characters without Latin transliteration,
  // sanitize it safely into clean unicode hyphenated slug or fallback
  if (!slug || slug === "-") {
    slug = "article-" + Math.random().toString(36).substring(2, 8);
  }

  // Enforce word limit: maximum 5 to 7 words (7 words limit)
  const segments = slug.split("-").filter(Boolean);
  if (segments.length > maxWords) {
    slug = segments.slice(0, maxWords).join("-");
  }

  // Ensure uniqueness if existingSlugs provided
  let candidate = slug;
  let counter = 2;
  while (existingSlugs.includes(candidate)) {
    candidate = `${slug}-${counter}`;
    counter++;
  }

  return candidate;
}

/**
 * Extracts plain text from HTML or Markdown
 */
export function stripToPlainText(content: string): string {
  if (!content) return "";
  const text = content
    // Strip HTML tags
    .replace(/<[^>]*>/g, " ")
    // Strip Markdown code blocks
    .replace(/```[\s\S]*?```/g, " ")
    // Strip inline code
    .replace(/`([^`]+)`/g, "$1")
    // Strip bold & italic
    .replace(/\*\*\*([^*]+)\*\*\*/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    // Strip markdown images and links
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    // Strip markdown headers, blockquotes, bullets
    .replace(/^[#>*+\-\s]+/gm, " ")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim();

  return text;
}

/**
 * Analyzes content and extracts full article metadata
 */
export function extractArticleMetadata(
  content: string,
  format: "html" | "markdown" = "html",
  options?: { existingSlugs?: string[] }
): ExtractedMetadata {
  const existingSlugs = options?.existingSlugs || [];
  const plainText = stripToPlainText(content);

  // 1. Title & Heading Extraction
  let title = "";
  let subtitle = "";
  const headings: { text: string; level: number }[] = [];
  let h1Count = 0;

  if (format === "html" || content.includes("<h")) {
    const headingRegex = /<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1], 10);
      const hText = match[2].replace(/<[^>]*>/g, "").trim();
      if (hText) {
        headings.push({ text: hText, level });
        if (level === 1) {
          h1Count++;
          if (!title) title = hText;
        }
      }
    }
  }

  // Check Markdown headings if HTML didn't yield a title or format is markdown
  if (!title) {
    const lines = content.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      const mdH1Match = trimmed.match(/^#\s+(.+)$/);
      if (mdH1Match) {
        h1Count++;
        if (!title) title = mdH1Match[1].trim();
        headings.push({ text: mdH1Match[1].trim(), level: 1 });
        continue;
      }
      const mdHMatch = trimmed.match(/^(#{2,4})\s+(.+)$/);
      if (mdHMatch) {
        headings.push({ text: mdHMatch[2].trim(), level: mdHMatch[1].length });
      }
    }
  }

  // Fallback title from opening plain text
  if (!title && plainText) {
    const firstSentence = plainText.split(/[.?!।\n]/)[0].trim();
    title = firstSentence.length > 80 ? firstSentence.slice(0, 77) + "..." : firstSentence;
  }

  // 2. Subtitle / Excerpt Extraction
  let excerpt = "";
  if (format === "html") {
    const pMatch = content.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      excerpt = pMatch[1].replace(/<[^>]*>/g, "").trim();
    }
  }
  if (!excerpt) {
    // Take first paragraph from plainText
    const paragraphs = plainText.split(/\n\s*\n|\.\s+/);
    if (paragraphs.length > 0) {
      excerpt = paragraphs[0].trim();
    }
  }
  if (excerpt.length > 200) {
    // Cut cleanly at last word boundary
    const cut = excerpt.slice(0, 195);
    const lastSpace = cut.lastIndexOf(" ");
    excerpt = (lastSpace > 100 ? cut.slice(0, lastSpace) : cut) + "...";
  }

  // Subtitle (if second heading exists or opening sentence)
  const firstH2 = headings.find((h) => h.level === 2);
  if (firstH2) {
    subtitle = firstH2.text;
  }

  // 3. Slug Generation
  const slug = generateCleanSlug(title, existingSlugs);

  // 4. Table of Contents
  const tableOfContents: TocItem[] = headings
    .filter((h) => h.level >= 2 && h.level <= 4)
    .map((h) => ({
      id: generateCleanSlug(h.text),
      text: h.text,
      level: h.level
    }));

  // 5. Word Count & Reading Time (180 words/min)
  const words = plainText ? plainText.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const characterCount = plainText.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));
  const headingCount = headings.length;

  const paragraphCount = format === "html"
    ? (content.match(/<p\b[^>]*>/gi) || []).length
    : content.split(/\n\s*\n/).filter((b) => b.trim() && !b.trim().startsWith("#")).length;

  // 6. Keywords & Tags
  const lowerText = plainText.toLowerCase();
  const matchedTags: string[] = [];

  for (const tag of COMMON_TECH_TAGS) {
    if (lowerText.includes(tag.toLowerCase())) {
      matchedTags.push(tag);
    }
  }

  const suggestedTags = Array.from(new Set(matchedTags)).slice(0, 8);
  if (suggestedTags.length === 0) {
    suggestedTags.push("Web Development", "Projukti Labs");
  }

  // 7. Category Scoring
  let bestCategorySlug = "web-development";
  let maxScore = 0;

  for (const [catSlug, catInfo] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of catInfo.keywords) {
      if (lowerText.includes(kw.toLowerCase())) {
        score += 2;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestCategorySlug = catSlug;
    }
  }

  const confidence = maxScore >= 6 ? "high" : maxScore >= 2 ? "medium" : "low";
  const suggestedCategory = {
    slug: bestCategorySlug,
    name: CATEGORY_KEYWORDS[bestCategorySlug]?.name || "Web Development",
    confidence: confidence as "high" | "medium" | "low"
  };

  // 8. Focus Keyword & SEO Suggestions
  const focusKeyword = suggestedTags[0] || "Web Development";
  const seoTitle = title.length > 55 ? title.slice(0, 55) : `${title} | Projukti Labs`;
  const seoDescription = excerpt || `Projukti Labs insights on ${title}.`;

  return {
    title,
    subtitle,
    slug,
    excerpt,
    plainText,
    wordCount,
    characterCount,
    readingTimeMinutes,
    headingCount,
    paragraphCount,
    tableOfContents,
    suggestedTags,
    suggestedCategory,
    focusKeyword,
    seoTitle,
    seoDescription,
    multipleH1Warning: h1Count > 1
  };
}
