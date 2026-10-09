"use client";

import { blogPosts } from "@/utils/data/blog-data";
import { motion } from "framer-motion";
import Link from "next/link";

const categoryColors = {
  Flutter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "React Native": "bg-green-500/10 text-green-400 border-green-500/20",
  "Mobile Development": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Career: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BlogPreview() {
  const preview = blogPosts.slice(0, 3);

  return (
    <div id="blog" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-4">
            ✍️ Technical Writing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            From the <span className="text-yellow-400">Blog</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed px-2">
            In-depth articles on Flutter, React Native, AI integration, and lessons from
            building and shipping real mobile apps.
          </p>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Cards — 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {preview.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="h-full"
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <div className="h-full rounded-xl bg-zinc-900/80 border border-zinc-800 group-hover:border-yellow-400/50 transition-all duration-300 flex flex-col overflow-hidden">
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    {/* Category + read time */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${categoryColors[post.category] || "bg-zinc-800 text-gray-400 border-zinc-700"}`}>
                        {post.category}
                      </span>
                      <span className="text-gray-600 text-xs">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-yellow-400 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed flex-1 mb-3 sm:mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800 mt-auto">
                      <span className="text-gray-600 text-xs">{formatDate(post.date)}</span>
                      <span className="text-yellow-400 text-xs font-medium">Read →</span>
                    </div>
                  </div>
                  <div className="h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm"
          >
            View All Articles →
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

export default BlogPreview;
