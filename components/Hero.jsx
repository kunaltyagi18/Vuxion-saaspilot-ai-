"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const VIDEO_URL =
  "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/cloudinarry%20to%20cloudflare/202606021731-e_hqa6sn.mp4";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Subtle parallax — content rises as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* ── VIDEO BACKGROUND ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Cinematic vignette (edges darker) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.7)_100%)]" />

        {/* Subtle animated colour tint — gives the 3D/futuristic vibe */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-violet-900/30"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── FLOATING GRID OVERLAY ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]
          bg-[linear-gradient(to_right,#6366f110_1px,transparent_1px),
              linear-gradient(to_bottom,#6366f110_1px,transparent_1px)]
          bg-[size:60px_60px]"
      />

      {/* ── CONTENT ───────────────────────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center max-w-5xl w-full mx-auto px-6 pt-28 pb-20"
      >

        {/* Live badge */}
        <motion.span
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight text-white max-w-4xl"
        >
          We Craft{" "}
          <span className="relative inline-block">
            <span
              className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400
                bg-clip-text text-transparent"
            >
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
          {" "}Digital Experiences
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 text-white/75 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium"
        >
          Full-stack web development, stunning UI/UX design &amp; SEO —
          engineered to be fast, scalable, and built for growth.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          {/* Primary */}
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-2 rounded-2xl font-bold
              bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500
              text-white px-8 py-4 text-base
              shadow-xl shadow-violet-700/40
              hover:shadow-violet-500/60 hover:-translate-y-1
              active:scale-95 transition-all duration-200 overflow-hidden"
          >
            {/* Shimmer on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            Explore Our Work
            <span className="transition-transform duration-200 group-hover:translate-x-1 text-lg">→</span>
          </Link>

          {/* Secondary */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl font-bold
              border border-white/30 bg-white/10 backdrop-blur-md
              text-white px-8 py-4 text-base
              hover:bg-white/20 hover:-translate-y-1
              active:scale-95 transition-all duration-200
              shadow-lg shadow-black/20"
          >
            Start a Project
          </Link>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
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
              className="flex flex-col items-center gap-0.5"
            >
              <span className="text-2xl sm:text-3xl font-black text-white">
                {stat.value}
              </span>
              <span className="text-white/55 text-xs font-semibold uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
