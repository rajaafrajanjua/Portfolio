import { projectsData } from "@/utils/data/projects-data";

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-rajaafrajanjua.vercel.app";
  const now = new Date().toISOString();

  // Static routes
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic project detail pages (if /details/[index] route exists)
  const projectRoutes = projectsData.map((project, index) => ({
    url: `${siteUrl}/details/${index}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
