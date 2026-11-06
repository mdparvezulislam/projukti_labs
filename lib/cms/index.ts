import { getDb } from "@/lib/db";
import {
  services,
  servicePackages,
  blogPosts,
  portfolioProjects,
  faqs,
  siteSettings,
  pageSections,
  NewServiceEntity,
  NewServicePackageEntity,
  NewBlogPostEntity,
  NewPortfolioProjectEntity,
  NewFaqEntity,
  NewPageSection,
} from "@/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { SERVICE_CATEGORIES, ServiceCategory, ServiceItem } from "@/modules/services/data";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/modules/blog/data";
import { BlogPost } from "@/modules/blog/types";

// ==========================================
// Site Settings
// ==========================================

export async function getSiteSettings(): Promise<Record<string, Record<string, unknown>>> {
  try {
    const db = getDb();
    const rows = await db.select().from(siteSettings);
    const settingsMap: Record<string, Record<string, unknown>> = {};
    for (const row of rows) {
      settingsMap[row.key] = row.value;
    }
    return settingsMap;
  } catch {
    return {};
  }
}

export async function getSiteSettingByKey(key: string): Promise<Record<string, unknown> | null> {
  try {
    const db = getDb();
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    return rows[0]?.value ?? null;
  } catch {
    return null;
  }
}

export async function updateSiteSetting(key: string, value: Record<string, unknown>): Promise<void> {
  const db = getDb();
  const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  if (existing.length > 0) {
    await db.update(siteSettings).set({ value, updatedAt: new Date() }).where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({
      id: `set_${key}`,
      key,
      value,
      updatedAt: new Date(),
    });
  }
}

// ==========================================
// Page Sections
// ==========================================

export async function getPageSections(pageSlug: string) {
  try {
    const db = getDb();
    const sections = await db
      .select()
      .from(pageSections)
      .where(eq(pageSections.pageSlug, pageSlug))
      .orderBy(asc(pageSections.sortOrder));
    return sections;
  } catch {
    return [];
  }
}

export async function upsertPageSection(data: NewPageSection) {
  const db = getDb();
  const existing = await db.select().from(pageSections).where(eq(pageSections.id, data.id)).limit(1);
  if (existing.length > 0) {
    await db.update(pageSections).set({ ...data, updatedAt: new Date() }).where(eq(pageSections.id, data.id));
  } else {
    await db.insert(pageSections).values(data);
  }
}

// ==========================================
// Services & Packages
// ==========================================

export async function getCmsServices(): Promise<ServiceCategory[]> {
  try {
    const db = getDb();
    const allServices = await db.select().from(services).orderBy(asc(services.sortOrder));
    const allPackages = await db.select().from(servicePackages).orderBy(asc(servicePackages.sortOrder));

    if (allServices.length === 0) {
      return SERVICE_CATEGORIES;
    }

    // Group packages by serviceId
    const packagesByServiceId = new Map<string, typeof allPackages>();
    for (const pkg of allPackages) {
      const list = packagesByServiceId.get(pkg.serviceId) ?? [];
      list.push(pkg);
      packagesByServiceId.set(pkg.serviceId, list);
    }

    // Map into ServiceCategory array
    const categoryMap = new Map<string, ServiceCategory>();
    for (const cat of SERVICE_CATEGORIES) {
      categoryMap.set(cat.slug, {
        ...cat,
        services: [],
      });
    }

    for (const s of allServices) {
      const cat = categoryMap.get(s.categorySlug);
      const pkgs = (packagesByServiceId.get(s.id) ?? []).map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        priceBdt: p.priceBdt,
        priceUsd: p.priceUsd,
        billingPeriod: (p.billingPeriod ?? "one-time") as "one-time" | "monthly" | "custom",
        description: p.description,
        popular: Boolean(p.isPopular),
        slaHours: p.slaHours ?? undefined,
        deliverables: p.deliverables ?? [],
        exclusions: p.exclusions ?? [],
      }));

      const serviceItem: ServiceItem = {
        id: s.id,
        slug: s.slug,
        categorySlug: s.categorySlug,
        name: s.name,
        tagline: s.tagline ?? "",
        description: s.description,
        isFlagship: Boolean(s.isFlagship),
        deliverables: s.deliverables ?? [],
        exclusions: s.exclusions ?? [],
        technicalHighlights: s.technicalHighlights ?? [],
        packages: pkgs,
      };

      if (cat) {
        cat.services.push(serviceItem);
      }
    }

    return Array.from(categoryMap.values());
  } catch {
    return SERVICE_CATEGORIES;
  }
}

export async function getCmsServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const db = getDb();
    const rows = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
    if (!rows[0]) return null;

    const s = rows[0];
    const pkgs = await db
      .select()
      .from(servicePackages)
      .where(eq(servicePackages.serviceId, s.id))
      .orderBy(asc(servicePackages.sortOrder));

    return {
      id: s.id,
      slug: s.slug,
      categorySlug: s.categorySlug,
      name: s.name,
      tagline: s.tagline ?? "",
      description: s.description,
      isFlagship: Boolean(s.isFlagship),
      deliverables: s.deliverables ?? [],
      exclusions: s.exclusions ?? [],
      technicalHighlights: s.technicalHighlights ?? [],
      packages: pkgs.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        priceBdt: p.priceBdt,
        priceUsd: p.priceUsd,
        billingPeriod: (p.billingPeriod ?? "one-time") as "one-time" | "monthly" | "custom",
        description: p.description,
        popular: Boolean(p.isPopular),
        slaHours: p.slaHours ?? undefined,
        deliverables: p.deliverables ?? [],
        exclusions: p.exclusions ?? [],
      })),
    };
  } catch {
    for (const cat of SERVICE_CATEGORIES) {
      const match = cat.services.find((s) => s.slug === slug);
      if (match) return match;
    }
    return null;
  }
}

export async function upsertCmsService(data: NewServiceEntity) {
  const db = getDb();
  const existing = await db.select().from(services).where(eq(services.id, data.id)).limit(1);
  if (existing.length > 0) {
    await db.update(services).set({ ...data, updatedAt: new Date() }).where(eq(services.id, data.id));
  } else {
    await db.insert(services).values(data);
  }
}

export async function upsertCmsServicePackage(data: NewServicePackageEntity) {
  const db = getDb();
  const existing = await db.select().from(servicePackages).where(eq(servicePackages.id, data.id)).limit(1);
  if (existing.length > 0) {
    await db.update(servicePackages).set({ ...data, updatedAt: new Date() }).where(eq(servicePackages.id, data.id));
  } else {
    await db.insert(servicePackages).values(data);
  }
}

// ==========================================
// Blog Posts
// ==========================================

function mapPostToBlogPost(p: typeof blogPosts.$inferSelect): BlogPost & { isFeatured?: boolean } {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === p.category);
  const minutes = parseInt(p.readTime ?? "5", 10) || 5;
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category as BlogPost["category"],
    categoryName: cat?.name ?? p.category,
    tags: p.tags ?? [],
    publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    readingTimeMinutes: minutes,
    featured: Boolean(p.isFeatured),
    isFeatured: Boolean(p.isFeatured),
    coverImage: p.coverImage ?? undefined,
    author: {
      name: "Md Parvezul Islam",
      role: "Founder & Principal Software Architect, Projukti Labs",
      avatarUrl: "/founder-avatar.png",
    },
    seoTitle: p.seoTitle ?? p.title,
    seoDescription: p.seoDescription ?? p.excerpt,
  };
}

export async function getCmsBlogPosts(status?: string): Promise<BlogPost[]> {
  try {
    const db = getDb();
    let query = db.select().from(blogPosts);
    if (status) {
      // @ts-expect-error drizzle where filter
      query = query.where(eq(blogPosts.status, status));
    }
    const posts = await query.orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));
    if (posts.length === 0) {
      return BLOG_POSTS;
    }
    return posts.map(mapPostToBlogPost);
  } catch {
    return BLOG_POSTS;
  }
}

export async function getCmsBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const db = getDb();
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (rows[0]) {
      return mapPostToBlogPost(rows[0]);
    }
  } catch {
    // fallback to static
  }
  const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
  return staticPost ?? null;
}

export async function upsertCmsBlogPost(data: NewBlogPostEntity) {
  const db = getDb();
  const existing = await db.select().from(blogPosts).where(eq(blogPosts.id, data.id)).limit(1);
  if (existing.length > 0) {
    await db.update(blogPosts).set({ ...data, updatedAt: new Date() }).where(eq(blogPosts.id, data.id));
  } else {
    await db.insert(blogPosts).values(data);
  }
}

export async function deleteCmsBlogPost(id: string) {
  const db = getDb();
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ==========================================
// FAQs
// ==========================================

export async function getCmsFaqs() {
  try {
    const db = getDb();
    const rows = await db.select().from(faqs).where(eq(faqs.isActive, true)).orderBy(asc(faqs.sortOrder));
    return rows;
  } catch {
    return [];
  }
}

export async function upsertCmsFaq(data: NewFaqEntity) {
  const db = getDb();
  const existing = await db.select().from(faqs).where(eq(faqs.id, data.id)).limit(1);
  if (existing.length > 0) {
    await db.update(faqs).set({ ...data, updatedAt: new Date() }).where(eq(faqs.id, data.id));
  } else {
    await db.insert(faqs).values(data);
  }
}

export async function deleteCmsFaq(id: string) {
  const db = getDb();
  await db.delete(faqs).where(eq(faqs.id, id));
}

// ==========================================
// Portfolio
// ==========================================

export async function getCmsPortfolio() {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.isPublished, true))
      .orderBy(asc(portfolioProjects.sortOrder));
    return rows;
  } catch {
    return [];
  }
}

export async function upsertCmsPortfolioProject(data: NewPortfolioProjectEntity) {
  const db = getDb();
  const existing = await db.select().from(portfolioProjects).where(eq(portfolioProjects.id, data.id)).limit(1);
  if (existing.length > 0) {
    await db.update(portfolioProjects).set({ ...data, updatedAt: new Date() }).where(eq(portfolioProjects.id, data.id));
  } else {
    await db.insert(portfolioProjects).values(data);
  }
}
