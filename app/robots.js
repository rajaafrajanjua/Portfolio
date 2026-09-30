export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-rajaafrajanjua.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Allow Google AdSense crawler explicitly
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
      {
        // Allow Google AdsBot
        userAgent: "AdsBot-Google",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
