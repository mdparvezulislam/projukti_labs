import { describe, it, expect } from "vitest";
import {
  getAllPosts,
  getFeaturedPost,
  getPostBySlug,
  getPostsByCategory,
  getPostsByTag,
  getAllCategories,
  getCategoryBySlug,
  searchPosts,
  BlogPostSchema,
} from "@/modules/blog";

describe("Phase 06: Blog Engine & Markdown Architecture", () => {
  it("should have exactly 5 authentic demonstration articles passing Zod schema", () => {
    const posts = getAllPosts();
    expect(posts.length).toBe(5);

    for (const post of posts) {
      const parsed = BlogPostSchema.safeParse(post);
      expect(parsed.success).toBe(true);
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.content).toBeTruthy();
      expect(post.author.name).toBe("Md Parvezul Islam");
      expect(post.readingTimeMinutes).toBeGreaterThan(0);
      expect(post.tags.length).toBeGreaterThan(0);
    }
  });

  it("should designate exactly one featured post", () => {
    const featured = getFeaturedPost();
    expect(featured).toBeDefined();
    expect(featured?.featured).toBe(true);
    expect(featured?.slug).toBe("why-business-needs-professional-website");
  });

  it("should retrieve articles by slug", () => {
    const post = getPostBySlug("how-ecommerce-works-in-bangladesh");
    expect(post).toBeDefined();
    expect(post?.title).toContain("E-commerce");
    expect(post?.category).toBe("ecommerce");

    const nonExistent = getPostBySlug("quantum-time-travel");
    expect(nonExistent).toBeUndefined();
  });

  it("should filter articles by category", () => {
    const webDevPosts = getPostsByCategory("web-development");
    expect(webDevPosts.length).toBeGreaterThan(0);
    for (const p of webDevPosts) {
      expect(p.category).toBe("web-development");
    }

    const marketingPosts = getPostsByCategory("digital-marketing");
    expect(marketingPosts.length).toBeGreaterThan(0);
    for (const p of marketingPosts) {
      expect(p.category).toBe("digital-marketing");
    }
  });

  it("should filter articles by tag", () => {
    const bkashPosts = getPostsByTag("bKash");
    expect(bkashPosts.length).toBeGreaterThan(0);
    for (const p of bkashPosts) {
      expect(p.tags).toContain("bKash");
    }

    const speedPosts = getPostsByTag("Speed");
    expect(speedPosts.length).toBeGreaterThan(0);

    const capiPosts = getPostsByTag("CAPI");
    expect(capiPosts.length).toBeGreaterThan(0);
  });

  it("should retrieve all 5 categories with valid metadata", () => {
    const categories = getAllCategories();
    expect(categories.length).toBe(5);

    const slugs = categories.map((c) => c.slug);
    expect(slugs).toContain("web-development");
    expect(slugs).toContain("ecommerce");
    expect(slugs).toContain("digital-marketing");
    expect(slugs).toContain("website-performance");
    expect(slugs).toContain("business-tech");

    const ecomCat = getCategoryBySlug("ecommerce");
    expect(ecomCat).toBeDefined();
    expect(ecomCat?.name).toBe("E-commerce");
  });

  it("should search articles by keyword across title, excerpt, and content", () => {
    const capiResults = searchPosts("CAPI");
    expect(capiResults.length).toBeGreaterThan(0);
    expect(capiResults[0].slug).toBe("meta-pixel-and-conversion-tracking-explained");

    const lcpResults = searchPosts("LCP");
    expect(lcpResults.length).toBeGreaterThan(0);
    expect(lcpResults[0].slug).toBe("website-speed-and-core-web-vitals-guide");
  });
});
