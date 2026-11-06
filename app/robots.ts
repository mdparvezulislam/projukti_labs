import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://projuktilabs.tech";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/poc/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

