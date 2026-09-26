"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const VIDEO_URL =
  "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/cloudinarry%20to%20cloudflare/202606021731-e_hqa6sn.mp4";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── VIDEO BACKGROUND ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-[70%_center] sm:object-center"
          aria-hidden="true"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Mobile: semi-dark overlay — enough to read text but rabbit still visible */}
        <div className="absolute inset-0 bg-black/55 sm:bg-transparent" />

        {/* Desktop: Left heavy gradient — darker left, right stays clear (rabbit visible) */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

        {/* Top/bottom cinematic bars */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

        {/* Animated indigo tint — only on left half */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 via-indigo-900/10 to-transparent"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── GRID OVERLAY ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]
          bg-[linear-gradient(to_right,#6366f10a_1px,transparent_1px),
              linear-gradient(to_bottom,#6366f10a_1px,transparent_1px)]
          bg-[size:60px_60px]"
      />

      {/* ── CONTENT — left aligned ────────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-20 pb-16"
      >
        {/* Text block — constrained to left ~50% on desktop, full width on mobile */}
        <div className="w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl">

          {/* Live badge */}
          <motion.span
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 rounded-full
              border border-white/20 bg-white/10 backdrop-blur-md
              text-white text-sm font-semibold px-5 py-2 mb-8
              shadow-lg shadow-indigo-900/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Building next-gen digital products
          </motion.span>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white"
          >
            We Craft{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Immersive
              </span>
              {/* Animated underline */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full
                  bg-gradient-to-r from-indigo-400 to-fuchsia-400 origin-left"
                aria-hidden="true"
              />
            </span>
            <br />Digital Experiences
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 text-white/75 text-base sm:text-lg leading-relaxed font-medium"
          >
            Full-stack web development, stunning UI/UX design &amp; SEO —
            engineered to be fast, scalable, and built for growth.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/services"
              className="group relative inline-flex items-center gap-2 rounded-2xl font-bold
                bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500
                text-white px-7 py-3.5 text-base
                shadow-xl shadow-violet-700/40
                hover:shadow-violet-500/60 hover:-translate-y-1
                active:scale-95 transition-all duration-200 overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0
                  -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
              Explore Our Work
              <span className="transition-transform duration-200 group-hover:translate-x-1 text-lg">→</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl font-bold
                border border-white/30 bg-white/10 backdrop-blur-md
                text-white px-7 py-3.5 text-base
                hover:bg-white/20 hover:-translate-y-1
                active:scale-95 transition-all duration-200 shadow-lg"
            >
              Start a Project
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-5"
            aria-label="Trust indicators"
          >
            {[
              { label: "Projects Delivered", value: "50+" },
              { label: "Happy Clients",      value: "30+" },
              { label: "Years Experience",   value: "5+"  },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.1 }}
                className="flex flex-col gap-0.5"
              >
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>


    </section>
  );
}
