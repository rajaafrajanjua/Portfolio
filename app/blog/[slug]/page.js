import { blogPosts } from "@/utils/data/blog-data";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Raja Afra Janjua"],
      tags: post.tags,
    },
  };
}

// Load content only for the requested slug — keeps the layout chunk small
async function getContent(slug) {
  try {
    const mod = await import(`@/utils/data/blog-content/${slug}.js`);
    return mod.content;
  } catch {
    return null;
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColors = {
  Flutter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "React Native": "bg-green-500/10 text-green-400 border-green-500/20",
  "Mobile Development": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Career: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

function parseInline(text) {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={match.index} className="text-white font-semibold">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      parts.push(<code key={match.index} className="px-1.5 py-0.5 bg-zinc-800 text-yellow-400 rounded text-xs font-mono">{token.slice(1, -1)}</code>);
    } else {
      const m = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (m) parts.push(<a key={match.index} href={m[2]} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">{m[1]}</a>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
}

function renderContent(content) {
  const lines = content.split("\n");
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-xl md:text-2xl font-bold text-white mt-10 mb-4">{line.replace("## ", "")}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-lg md:text-xl font-semibold text-yellow-400 mt-6 mb-3">{line.replace("### ", "")}</h3>);
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].replace("- ", "")); i++; }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 mb-5 ml-4">
          {items.map((item, idx) => (
            <li key={idx} className="text-gray-400 text-sm md:text-base leading-relaxed flex gap-2">
              <span className="text-yellow-400 mt-1 flex-shrink-0">•</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() !== "") {
      elements.push(<p key={i} className="text-gray-400 text-sm md:text-base leading-relaxed mb-5">{parseInline(line)}</p>);
    }
    i++;
  }
  return elements;
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = await getContent(slug);
  if (!content) notFound();

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = blogPosts[postIndex - 1] || null;
  const nextPost = blogPosts[postIndex + 1] || null;

  return (
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm mb-10 transition-colors">
          ← All Articles
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[post.category] || "bg-zinc-800 text-gray-400 border-zinc-700"}`}>
              {post.category}
            </span>
            <span className="text-gray-600 text-xs">{post.readTime}</span>
            <span className="text-gray-600 text-xs">{formatDate(post.date)}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug mb-5">{post.title}</h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-3 py-4 border-t border-b border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">RA</div>
            <div>
              <p className="text-white text-sm font-medium">Raja Afra Janjua</p>
              <p className="text-gray-600 text-xs">Mobile & Full-Stack Developer · Lahore, Pakistan</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs bg-zinc-800/80 text-gray-500 rounded-full border border-zinc-700">{tag}</span>
            ))}
          </div>
        </header>

        <article>{renderContent(content)}</article>

        <div className="mt-14 p-5 md:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 font-bold flex-shrink-0">RA</div>
            <div>
              <p className="text-white font-semibold mb-1">Raja Afra Janjua</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Mobile and Full-Stack Developer with 2 years of professional experience. Currently working as a React Native Developer at CrocusZone and Flutter Developer at JBMinds. Author of PDF ToolKits, QR Scanner, and HealthfulAI on the Google Play Store.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/rajaafrajanjua" target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">GitHub →</a>
                <a href="https://www.linkedin.com/in/raja-afra-janjua" target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">LinkedIn →</a>
                <Link href="/#contact" className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">Contact →</Link>
              </div>
            </div>
          </div>
        </div>

        <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300">
              <p className="text-gray-600 text-xs mb-1">← Previous</p>
              <p className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors line-clamp-2">{prevPost.title}</p>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 text-right">
              <p className="text-gray-600 text-xs mb-1">Next →</p>
              <p className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors line-clamp-2">{nextPost.title}</p>
            </Link>
          ) : <div />}
        </nav>

        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all text-sm">
            ← Back to All Articles
          </Link>
        </div>
      </div>
    </main>
  );
}
