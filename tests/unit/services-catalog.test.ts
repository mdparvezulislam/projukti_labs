import { describe, it, expect } from "vitest";
import {
  getActiveCategories,
  getFutureCategories,
  getFlagshipServices,
  getServiceBySlug,
  getCategoryBySlug,
} from "@/modules/services/data";

describe("Phase 05: Services Catalog Integrity & Scope Boundary", () => {
  it("should enforce exactly 3 active launch categories and 7 future expansion categories", () => {
    const active = getActiveCategories();
    const future = getFutureCategories();

    expect(active.length).toBe(3);
    expect(active.map((c) => c.slug)).toEqual([
      "web-development",
      "ecommerce",
      "maintenance-support",
    ]);

    expect(future.length).toBe(7);
    for (const f of future) {
      expect(f.status).toBe("coming_soon");
    }
  });

  it("should have exactly 3 flagship productized services", () => {
    const flagships = getFlagshipServices();
    expect(flagships.length).toBe(3);

    const slugs = flagships.map((f) => f.slug);
    expect(slugs).toContain("landing-page-meta-pixel");
    expect(slugs).toContain("complete-ecommerce-website");
    expect(slugs).toContain("website-maintenance");
  });

  it("should provide valid packages and deliverables for each flagship service", () => {
    const lp = getServiceBySlug("landing-page-meta-pixel");
    expect(lp).toBeDefined();
    expect(lp?.packages.length).toBeGreaterThanOrEqual(3);
    expect(lp?.deliverables.length).toBeGreaterThan(0);
    expect(lp?.exclusions.length).toBeGreaterThan(0);

    const ecom = getServiceBySlug("complete-ecommerce-website");
    expect(ecom).toBeDefined();
    expect(ecom?.packages.length).toBeGreaterThanOrEqual(3);

    const maint = getServiceBySlug("website-maintenance");
    expect(maint).toBeDefined();
    expect(maint?.packages.length).toBe(4); // Basic, Business, Priority, Custom
  });

  it("should resolve active categories by slug", () => {
    const webDev = getCategoryBySlug("web-development");
    expect(webDev).toBeDefined();
    expect(webDev?.name).toContain("Web Development & Design");

    const nonExistent = getCategoryBySlug("quantum-computing");
    expect(nonExistent).toBeUndefined();
  });
});

