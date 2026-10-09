import { blogPosts } from "@/utils/data/blog-data";
import Link from "next/link";

export const metadata = {
  title: "Blog — Mobile & Full-Stack Development",
  description:
    "Articles on Flutter, React Native, AI integration, and mobile app development by Raja Afra Janjua — a professional mobile developer based in Lahore, Pakistan.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Raja Afra Janjua",
    description: "Articles on Flutter, React Native, AI integration, and mobile app development.",
    type: "website",
  },
};

const categoryColors = {
  Flutter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "React Native": "bg-green-500/10 text-green-400 border-green-500/20",
  "Mobile Development": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Career: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <main className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Back link — its own row so it never clashes with the badge */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>

        {/* Page header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-block px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-4">
            ✍️ Technical Writing
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            The <span className="text-yellow-400">Blog</span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm md:text-base leading-relaxed px-2">
            In-depth articles on Flutter, React Native, AI integration, and lessons from
            building and shipping real mobile apps professionally.
          </p>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-5 rounded-full" />
        </div>

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="block group mb-8 sm:mb-12">
          <div className="relative rounded-xl sm:rounded-2xl bg-zinc-900/80 border border-zinc-800 group-hover:border-yellow-400/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-5 sm:p-6 md:p-8 relative">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full border ${categoryColors[featured.category] || "bg-zinc-800 text-gray-400 border-zinc-700"}`}>
                  {featured.category}
                </span>
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-full border border-yellow-400/20 font-medium">
                  ⭐ Featured
                </span>
                <span className="text-gray-600 text-xs">{featured.readTime}</span>
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2 sm:mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4 sm:mb-5 max-w-3xl line-clamp-3 sm:line-clamp-none">
                {featured.excerpt}
              </p>

              {/* Tags + date + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-zinc-800 text-gray-500 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-gray-600 text-xs">{formatDate(featured.date)}</span>
                  <span className="text-yellow-400 text-sm font-medium">Read article →</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid: 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="h-full rounded-xl bg-zinc-900/80 border border-zinc-800 group-hover:border-yellow-400/50 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${categoryColors[post.category] || "bg-zinc-800 text-gray-400 border-zinc-700"}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-600 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-800">
                    <span className="text-gray-600 text-xs">{formatDate(post.date)}</span>
                    <span className="text-yellow-400 text-xs font-medium">Read →</span>
                  </div>
                </div>
                <div className="h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
