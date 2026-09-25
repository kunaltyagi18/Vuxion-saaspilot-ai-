"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogTeaser() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(r => r.ok ? r.json() : [])
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  if (!posts.length) return null;

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gray-50 dark:bg-[#0a0a14] transition-colors duration-300">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/3 w-80 h-80 rounded-full bg-indigo-400/10 blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
              Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              From Our Blog
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-base">
              Tips, trends, and deep-dives from the Vuxion team.
            </p>
          </div>
          <Link href="/contact"
            className="shrink-0 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4">
            View All Posts →
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <motion.article
              key={post._id || i}
              initial={{ opacity: 0, y: 40, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="card-3d glow-hover bg-white dark:bg-gray-900
                border border-gray-100 dark:border-gray-800
                rounded-2xl overflow-hidden shadow-sm group flex flex-col"
            >
              {/* Card banner — real image if set, else gradient */}
              <div className="h-44 w-full relative overflow-hidden shrink-0">
                {post.image ? (
                  <>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Category badge over image */}
                    <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${post.color || "from-indigo-500 to-violet-500"} flex items-center justify-center relative`}>
                    <span className="text-5xl animate-float">{post.emoji || "📝"}</span>
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,white,transparent)]" />
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {!post.image && (
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug mb-3
                  group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-400 dark:text-gray-500">{post.date}</span>
                  {post.link ? (
                    <a href={post.link} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-block">
                      Read More →
                    </a>
                  ) : (
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-block">
                      Read More →
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
