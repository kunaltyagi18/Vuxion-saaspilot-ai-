"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";


// ── Default fallback (shown before fetch completes) ────────────────────────
const DEFAULT = {
  tagline: "We build digital experiences that matter.",
  description:
    "Vuxion is a full-stack web development agency passionate about building fast, scalable, and beautiful web applications. We work closely with startups and businesses to bring their ideas to life.",
  mission:
    "To help businesses grow by delivering high-quality digital products — on time, on budget, and beyond expectations.",
  vision:
    "To become the most trusted web development partner for startups and SMEs across India.",
  stats: [
    { label: "Projects Delivered", value: "50+" },
    { label: "Happy Clients",      value: "30+" },
    { label: "Years Experience",   value: "5+"  },
    { label: "Team Members",       value: "8+"  },
  ],
  teamMembers: [
    { name: "Kunal Tyagi", role: "Founder & Full-Stack Dev", bio: "Passionate about building scalable web apps with Next.js and MongoDB.", image: "" },
    { name: "Team Member", role: "UI/UX Designer",           bio: "Crafting beautiful, user-centric interfaces that convert.",           image: "" },
  ],
};

// ── Initials avatar ───────────────────────────────────────────────────────
function Avatar({ name, image, color }) {
  const COLORS = [
    "bg-indigo-600", "bg-violet-600", "bg-purple-600",
    "bg-sky-600",    "bg-teal-600",   "bg-rose-500",
  ];
  const bg = color || COLORS[name?.charCodeAt(0) % COLORS.length] || "bg-indigo-600";
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-2xl object-cover shadow-md"
      />
    );
  }
  return (
    <div className={`${bg} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-md`}>
      {name?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

export default function About({ preview = false }) {
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  return (
    <section
      id="about"
      className="py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section Badge + Heading ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3 max-w-2xl mx-auto leading-tight">
            {data.tagline}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-base max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* ── Stats Row ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {data.stats?.map((s, i) => (
            <div
              key={i}
              className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl p-6 text-center"
            >
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                {s.value}
              </p>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Mission & Vision ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/30 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-900/50">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-lg mb-4 shadow-md">
              🎯
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {data.mission}
            </p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/30 rounded-2xl p-8 border border-violet-100 dark:border-violet-900/50">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white text-lg mb-4 shadow-md">
              🔭
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {data.vision}
            </p>
          </div>
        </motion.div>

        {/* ── Team Section ─────────────────────────────────────────────────── */}
        {!preview && data.teamMembers?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
              Meet the Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar name={member.name} image={member.image} />
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white text-sm">
                        {member.name}
                      </p>
                      <p className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── View Full About CTA (home page only) ─────────────────────────── */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center mt-4"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500 px-7 py-3 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all"
            >
              Meet the Team &amp; Learn More →
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
