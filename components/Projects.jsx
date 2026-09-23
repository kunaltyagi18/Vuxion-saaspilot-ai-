"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Default images list agar database me image URL set na ho
const defaultProjectImages = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
];

export default function Projects({ limit }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayed = limit ? projects.slice(0, limit) : projects;

  // Projects API se fetch karne ka effect
  useEffect(() => {
    fetch("/api/projects")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // kabhi bhi array na mile toh UI crash na ho — defensive guard
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Projects fetch error:", err);
        setProjects([]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden bg-white dark:bg-[#080810] transition-colors duration-300">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-20 right-0 w-96 h-96 rounded-full bg-violet-500/10 dark:bg-violet-500/15 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 blur-[100px]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-100/60 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-900">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            Our Featured Work
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-xl mx-auto">
            Check out some of the awesome digital products we have crafted recently.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-80 animate-pulse border border-gray-300 dark:border-gray-600" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-10">
            Exciting projects coming soon — check back shortly!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayed.map((p, i) => {
              // agar dataset me image nahi hai toh fallback photo use karenge
              const projectImg = p.image || defaultProjectImages[i % defaultProjectImages.length];

              return (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 50, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                  className="card-3d glow-hover bg-white dark:bg-gray-900 rounded-2xl overflow-hidden
                    shadow-md border border-gray-100 dark:border-gray-800
                    flex flex-col group"
                >
                  <div className="h-48 w-full overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={projectImg}
                      alt={p.title || "Project screenshot"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {p.techStack?.map((t, j) => (
                          <span
                            key={j}
                            className="bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 text-xs px-2.5 py-1 rounded-md font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Live Link Button */}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline group-hover:translate-x-1 transition-transform"
                        >
                          View Live Project <span>→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All CTA — only on home page */}
        {limit && projects.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500 px-7 py-3 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all"
            >
              View All Projects →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}