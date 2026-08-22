import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getServices, getBlogPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([getServices(), getBlogPosts()]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/how-it-works",
    "/pricing",
    "/testimonials",
    "/book",
    "/blog",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${siteConfig.url}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
