import { describe, it, expect } from "vitest";
import {
  extractArticleMetadata,
  generateCleanSlug,
  stripToPlainText,
} from "@/lib/cms/blog-extractor";
import { sanitizeHtml } from "@/lib/cms/sanitizer";
import {
  markdownToHtml,
  htmlToMarkdown,
  detectContentFormat,
} from "@/lib/cms/content-converter";
import { getCmsBlogPosts, getCmsBlogPostBySlug, getCmsCategories } from "@/lib/cms";

describe("Phase 17: Smart Content Extraction Engine", () => {
  it("should extract H1 title, clean excerpt, and reading time from HTML content", () => {
    const sampleHtml = `
      <h1>Building Next.js 16 Applications with Edge Workers</h1>
      <p>Next.js 16 introduces remarkable streaming improvements and React 19 capabilities for high-speed cloud edge execution in modern web systems.</p>
      <h2>Architecture and Performance</h2>
      <p>Using Cloudflare Workers and D1 database provides sub-50ms latency across global locations.</p>
      <h3>Database Optimization</h3>
      <p>Drizzle ORM helps generate clean SQL queries without N+1 overhead.</p>
    `;

    const meta = extractArticleMetadata(sampleHtml, "html");

    expect(meta.title).toBe("Building Next.js 16 Applications with Edge Workers");
    expect(meta.slug).toBe("building-next-js-16-applications-with-edge-workers");
    expect(meta.excerpt).toContain("Next.js 16 introduces remarkable streaming");
    expect(meta.readingTimeMinutes).toBeGreaterThanOrEqual(1);
    expect(meta.headingCount).toBe(3);
    expect(meta.tableOfContents.length).toBe(2); // H2 and H3
    expect(meta.tableOfContents[0].text).toBe("Architecture and Performance");
    expect(meta.tableOfContents[0].level).toBe(2);
    expect(meta.suggestedTags).toContain("Next.js");
    expect(meta.suggestedCategory.slug).toBe("web-development");
  });

  it("should detect multiple H1 headings and warn the author", () => {
    const multiH1 = `
      <h1>First Major Topic</h1>
      <p>First section details.</p>
      <h1>Second Major Topic</h1>
      <p>Second section details.</p>
    `;

    const meta = extractArticleMetadata(multiH1, "html");
    expect(meta.multipleH1Warning).toBe(true);
    expect(meta.title).toBe("First Major Topic");
  });

  it("should generate deterministic URL slugs for English and Bengali titles", () => {
    const enSlug = generateCleanSlug("High Performance E-commerce in Bangladesh");
    expect(enSlug).toBe("high-performance-e-commerce-in-bangladesh");

    // Bengali title with mapped common tech terms
    const bnSlug = generateCleanSlug("একটি ব্যবসার জন্য প্রফেশনাল ওয়েবসাইট কেন প্রয়োজন?");
    expect(bnSlug).toContain("business");
    expect(bnSlug).toContain("website");
  });

  it("should prevent duplicate slugs when existingSlugs are provided", () => {
    const existing = ["why-choose-projukti-labs", "why-choose-projukti-labs-2"];
    const slug = generateCleanSlug("Why Choose Projukti Labs", existing);
    expect(slug).toBe("why-choose-projukti-labs-3");
  });

  it("should strip formatting and calculate accurate word counts", () => {
    const content = "# Header One\n\nThis is a **bold** paragraph with `inline code` and a [link](https://example.com).\n\nSecond paragraph.";
    const plain = stripToPlainText(content);
    expect(plain).not.toContain("#");
    expect(plain).not.toContain("**");
    expect(plain).not.toContain("`");
    expect(plain).toContain("This is a bold paragraph");

    const words = plain.split(/\s+/).filter(Boolean);
    expect(words.length).toBe(15);
  });
});

describe("Phase 17: HTML Sanitization & Security Policies", () => {
  it("should eliminate script tags and malicious event handlers", () => {
    const dirty = `
      <div>
        <p>Normal paragraph</p>
        <script>alert("XSS Attack!");</script>
        <img src="https://example.com/pic.jpg" onerror="alert('pwned')" alt="Safe Pic" />
        <a href="javascript:alert('steal_cookie')">Click here</a>
      </div>
    `;

    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain("<script>");
    expect(clean).not.toContain("alert");
    expect(clean).not.toContain("onerror");
    expect(clean).not.toContain("javascript:");
    expect(clean).toContain("<p>Normal paragraph</p>");
    expect(clean).toContain('alt="Safe Pic"');
  });

  it("should enforce rel=\"noopener noreferrer\" on target=\"_blank\" links", () => {
    const linkHtml = '<p>Read our <a href="https://github.com" target="_blank">repo</a></p>';
    const clean = sanitizeHtml(linkHtml);
    expect(clean).toContain('rel="noopener noreferrer"');
    expect(clean).toContain('target="_blank"');
  });

  it("should preserve safe editorial HTML tags and structure", () => {
    const rich = `
      <h2>Database Migrations</h2>
      <blockquote>A clean architecture prevents technical debt.</blockquote>
      <table class="w-full">
        <thead><tr><th>Col A</th><th>Col B</th></tr></thead>
        <tbody><tr><td>Val 1</td><td>Val 2</td></tr></tbody>
      </table>
      <pre><code>console.log("OK");</code></pre>
    `;

    const clean = sanitizeHtml(rich);
    expect(clean).toContain("<h2>Database Migrations</h2>");
    expect(clean).toContain("<blockquote>A clean architecture prevents technical debt.</blockquote>");
    expect(clean).toContain("<table");
    expect(clean).toContain("<th>Col A</th>");
    expect(clean).toContain('<code>console.log("OK");</code>');
  });
});

describe("Phase 17: Content Conversion (Markdown <-> HTML)", () => {
  it("should correctly detect content format", () => {
    expect(detectContentFormat("<p>This is HTML content</p>")).toBe("html");
    expect(detectContentFormat("## This is Markdown\n\nParagraph text here.")).toBe("markdown");
  });

  it("should convert Markdown tables and code snippets to structured HTML", () => {
    const md = `
| Feature | Supported |
| --- | --- |
| Rich Text | Yes |
| SEO Preview | Yes |

\`\`\`typescript
const a: number = 42;
\`\`\`
    `.trim();

    const html = markdownToHtml(md);
    expect(html).toContain("<table");
    expect(html).toContain(">Feature</th>");
    expect(html).toContain(">Rich Text</td>");
    expect(html).toContain('<pre><code class="language-typescript">const a: number = 42;</code></pre>');
  });

  it("should convert HTML back to clean Markdown without data loss", () => {
    const html = `
      <h2>Quick Heading</h2>
      <p>This is <strong>important</strong> and <em>notable</em>.</p>
      <ul><li>Item 1</li><li>Item 2</li></ul>
    `;

    const md = htmlToMarkdown(html);
    expect(md).toContain("## Quick Heading");
    expect(md).toContain("**important**");
    expect(md).toContain("*notable*");
    expect(md).toContain("- Item 1");
  });
});

describe("Phase 17: CMS Database & Category Integrity", () => {
  it("should retrieve categories from D1 with complete metadata", async () => {
    const categories = await getCmsCategories();
    expect(categories.length).toBeGreaterThanOrEqual(5);

    const slugs = categories.map((c) => c.slug);
    expect(slugs).toContain("web-development");
    expect(slugs).toContain("ecommerce");
    expect(slugs).toContain("digital-marketing");
  });

  it("should retrieve published posts with enriched editorial fields", async () => {
    const posts = await getCmsBlogPosts("published");
    expect(posts.length).toBeGreaterThanOrEqual(5);

    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.content).toBeTruthy();
      expect(post.readingTimeMinutes).toBeGreaterThan(0);
      expect(post.category).toBeTruthy();
    }
  });

  it("should fetch specific blog post by slug with full metadata", async () => {
    const post = await getCmsBlogPostBySlug("why-business-needs-professional-website");
    expect(post).toBeDefined();
    expect(post?.title).toContain("Professional Website");
    expect(post?.canonicalUrl).toContain("why-business-needs-professional-website");
    expect(post?.author.name).toBe("Md Parvezul Islam");
  });
});
