"use client";
import { motion } from "framer-motion";

export default function Hero() {
  // Hero section - Smooth entrance animations aur dark mode styling ke saath
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden
        bg-[radial-gradient(ellipse_at_top,_#ede9fe_0%,_#f8fafc_45%,_#f0f9ff_100%)]
        dark:bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_#0f172a_50%,_#0c1a2e_100%)]
        transition-colors duration-300"
    >
      {/* ── Decorative background layers ───────────────────────────── */}

      {/* Large primary glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[620px] w-[620px] rounded-full bg-indigo-400/20 dark:bg-indigo-600/15 blur-[120px]" />
      </div>

      {/* Secondary accent glow — violet, offset top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-violet-400/15 dark:bg-violet-700/10 blur-[100px]"
      />

      {/* Tertiary accent glow — sky, offset bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-24 h-[380px] w-[380px] rounded-full bg-sky-400/10 dark:bg-sky-700/10 blur-[100px]"
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px] dark:opacity-40"
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full mx-auto">

        {/* Badge pill */}
        <motion.span
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 dark:border-indigo-700/60
            bg-white/70 dark:bg-indigo-950/60 backdrop-blur-md
            text-indigo-600 dark:text-indigo-300 text-sm font-semibold
            px-5 py-2 mb-8 shadow-sm shadow-indigo-100 dark:shadow-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
          </span>
          We build modern web apps
        </motion.span>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight
            text-gray-900 dark:text-white max-w-3xl"
        >
          We turn your ideas into{" "}
          <span
            className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-600
              dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400
              bg-clip-text text-transparent"
          >
            digital reality
          </span>
        </motion.h1>

        {/* Decorative underline accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          aria-hidden="true"
          className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 origin-left"
        />

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="mt-7 text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed"
        >
          Full-stack web development, UI/UX design, and SEO — fast, scalable,
          and tailored for growth.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          {/* Primary CTA */}
          <a
            href="#services"
            className="group relative inline-flex items-center gap-2 rounded-xl font-semibold
              bg-gradient-to-br from-indigo-600 to-violet-600 text-white
              px-8 py-3.5 shadow-lg shadow-indigo-500/30
              hover:shadow-indigo-500/50 hover:-translate-y-0.5
              active:scale-95 transition-all duration-200 overflow-hidden"
          >
            {/* Shine overlay */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            Explore Services
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl font-semibold
              border border-gray-300 dark:border-gray-600
              bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm
              text-gray-800 dark:text-gray-100
              px-8 py-3.5
              hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-0.5
              active:scale-95 transition-all duration-200
              shadow-sm"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social-proof trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3
            text-gray-400 dark:text-gray-500 text-sm font-medium"
          aria-label="Trust indicators"
        >
          {[
            { label: "Projects Delivered", value: "50+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Experience", value: "5+" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 text-base font-bold">
                {stat.value}
              </span>
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
