"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// ── Three.js background — SSR-safe dynamic import ───────────────────────────
const HeroBG3DCanvas = dynamic(
  () => import("./HeroBG3DCanvas"),
  { ssr: false, loading: () => null }
);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#06060f]"
    >
      {/* ── 3D BACKGROUND CANVAS ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <HeroBG3DCanvas />
      </div>

      {/* ── OVERLAYS ─────────────────────────────────────────────────────── */}
      {/* Radial vignette — keeps center darker so text pops */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, #06060fcc 60%, #06060f 100%)",
        }}
      />

      {/* Left gradient — text area stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, #06060fdd 0%, #06060faa 35%, transparent 65%)",
        }}
      />

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-40 z-[1] pointer-events-none
          bg-gradient-to-t from-[#06060f] to-transparent"
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]
          bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),
              linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]
          bg-[size:60px_60px]"
      />

      {/* Animated indigo tint pulse */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none
          bg-gradient-to-r from-indigo-900/40 via-indigo-900/10 to-transparent"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-20 pb-16"
      >
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
            style={{ textShadow: "0 0 80px rgba(99,102,241,0.4)" }}
          >
            We Craft{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Immersive
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full
                  bg-gradient-to-r from-indigo-400 to-fuchsia-400 origin-left"
                aria-hidden
              />
            </span>
            <br />Digital Experiences
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 text-white/70 text-base sm:text-lg leading-relaxed font-medium"
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
                aria-hidden
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

      {/* ── Cursor hint (mobile hidden) ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden lg:flex absolute bottom-8 right-12 z-10 items-center gap-2"
        aria-hidden
      >
        <motion.div
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/25 text-xs tracking-widest uppercase font-medium"
        >
          Move cursor to interact
        </motion.div>
        <div className="w-4 h-4 border border-white/25 rounded-full" />
      </motion.div>
    </section>
  );
}
