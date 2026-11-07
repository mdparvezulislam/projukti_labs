import { MetadataRoute } from "next";
import { getAllCategories } from "@/modules/blog";
import { getCmsBlogPosts } from "@/lib/cms";
import { SERVICE_CATEGORIES } from "@/modules/services/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://projuktilabs.tech";
  const now = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/landing-page-meta-pixel`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/complete-ecommerce-website`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/website-maintenance`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/founder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-a-quote`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Blog articles from CMS (published only)
  const publishedPosts = await getCmsBlogPosts("published");
  const blogRoutes: MetadataRoute.Sitemap = publishedPosts
    .filter((post) => post.robotsIndex !== false)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Blog categories
  const blogCategoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Service categories
  const serviceCategoryRoutes: MetadataRoute.Sitemap = SERVICE_CATEGORIES.filter(
    (c) => c.status === "active"
  ).map((cat) => ({
    url: `${baseUrl}/services/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceCategoryRoutes, ...blogRoutes, ...blogCategoryRoutes];
}

