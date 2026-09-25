"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Default fallback ────────────────────────────────────────────────────────
const DEFAULT = {
  tagline: "We build digital experiences that matter.",
  description:
    "Vuxion is a full-stack web development agency passionate about building fast, scalable, and beautiful web applications. We work closely with startups and businesses to bring their ideas to life.",
  image: "",
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

// Fallback gradient image when no image is set
function AboutImage({ src }) {
  if (src) {
    return (
      <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
        <Image src={src} alt="About Vuxion" fill className="object-cover" />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent" />
      </div>
    );
  }
  // Beautiful placeholder when no image
  return (
    <div className="relative w-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl
      bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 flex flex-col items-center justify-center gap-6 p-10">
      {/* Grid overlay */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Glow blobs */}
      <div aria-hidden className="absolute top-8 left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
      <div aria-hidden className="absolute bottom-8 right-8 w-40 h-40 rounded-full bg-fuchsia-400/20 blur-2xl" />

      <div className="relative z-10 text-center">
        <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl">
          V
        </div>
        <p className="text-white/90 font-bold text-xl">Vuxion</p>
        <p className="text-white/60 text-sm mt-1">Digital Agency</p>
      </div>

      {/* Floating skill badges */}
      {["Next.js", "React", "MongoDB", "UI/UX"].map((tag, i) => (
        <motion.div
          key={tag}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          className="absolute bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            top: `${20 + (i % 2) * 50}%`,
            left: i < 2 ? `${5 + i * 5}%` : "auto",
            right: i >= 2 ? `${5 + (i-2) * 5}%` : "auto",
          }}
        >
          {tag}
        </motion.div>
      ))}
    </div>
  );
}

export default function About({ preview = false }) {
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setData({ ...DEFAULT, ...d }); })
      .catch(() => {});
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden bg-white dark:bg-[#080810] transition-colors duration-300"
    >
      {/* BG grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div aria-hidden className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 rounded-full bg-indigo-400/10 dark:bg-indigo-500/15 blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
            About Us
          </span>
        </motion.div>

        {/* ── TWO COLUMN LAYOUT ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <AboutImage src={data.image} />
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Tagline */}
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
              {data.tagline}
            </h2>

            {/* Description */}
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              {data.description}
            </p>

            {/* Mission pill */}
            <div className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl p-4">
              <span className="text-xl shrink-0 mt-0.5">🎯</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white font-bold">Mission: </strong>
                {data.mission}
              </p>
            </div>

            {/* 4 Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {(data.stats || []).slice(0, 4).map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="card-3d glow-hover bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-center"
                >
                  <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-1">
                    {s.value}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            {preview ? (
              <Link
                href="/about"
                className="self-start inline-flex items-center gap-2 bg-indigo-600 text-white
                  px-6 py-3 rounded-xl font-bold text-sm
                  hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95
                  transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                Learn More About Us →
              </Link>
            ) : null}
          </motion.div>
        </div>

        {/* ── Full page extras (non-preview) ────────────────────────────── */}
        {!preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20"
          >
            {/* Vision */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 rounded-2xl p-8 border border-violet-100 dark:border-violet-900/50 mb-12">
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white text-lg mb-4 shadow-md">🔭</div>
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{data.vision}</p>
            </div>

            {/* Team */}
            {data.teamMembers?.length > 0 && (
              <>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-10">Meet the Team</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {data.teamMembers.map((member, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="card-3d glow-hover bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-extrabold shadow-md shrink-0 overflow-hidden">
                          {member.image
                            ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            : member.name?.[0]?.toUpperCase()
                          }
                        </div>
                        <div>
                          <p className="font-extrabold text-gray-900 dark:text-white text-sm">{member.name}</p>
                          <p className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold mt-0.5">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}
