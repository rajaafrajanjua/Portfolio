import { blogPosts } from "@/utils/data/blog-data";
import { projectsData } from "@/utils/data/projects-data";

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-rajaafrajanjua.vercel.app";
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes = projectsData.map((_p, index) => ({
    url: `${siteUrl}/details/${index}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
