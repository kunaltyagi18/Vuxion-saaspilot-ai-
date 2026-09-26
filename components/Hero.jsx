"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// ── Three.js background — SSR-safe ───────────────────────────────────────────
const HeroBG3DCanvas = dynamic(
  () => import("./HeroBG3DCanvas"),
  { ssr: false, loading: () => null }
);

// ── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard() {
  const cardRef = useRef(null);

  // Raw mouse values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Springy smooth follow
  const springConfig = { stiffness: 120, damping: 18 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  // Map to rotation
  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [18, -18]);

  // Glow position follows cursor
  const glowX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  function onMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="relative w-[320px] sm:w-[380px] lg:w-[420px] aspect-square
        cursor-none select-none"
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-4 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #a855f740 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spinning neon ring — back layer */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-indigo-500/30 pointer-events-none"
        style={{ translateZ: -20 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-6 rounded-full border border-fuchsia-500/20 pointer-events-none"
        style={{ translateZ: -40 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Main image card */}
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden
          border border-white/10 shadow-2xl shadow-indigo-900/50
          bg-gradient-to-b from-[#0d0d20] to-[#06060f]"
        style={{ translateZ: 30 }}
      >
        {/* Cursor-following specular glint */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 rounded-3xl"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Character image */}
        <Image
          src="/hero-character.jpg"
          alt="Vuxion mascot — chibi tech developer"
          fill
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
          className="object-cover object-top"
          priority
        />

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#06060f] to-transparent z-10" />

        {/* Status badge */}
        <motion.div
          style={{ translateZ: 50 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20
            flex items-center gap-2 whitespace-nowrap
            bg-black/60 backdrop-blur-md border border-white/10
            text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Building your next product...
        </motion.div>
      </motion.div>

      {/* Floating tech badges — 3D depth */}
      {[
        { label: "React", color: "#61dafb", x: "-60px", y: "20%", z: 50, delay: 0.8 },
        { label: "Next.js", color: "#ffffff", x: "calc(100% + 10px)", y: "30%", z: 40, delay: 1 },
        { label: "MongoDB", color: "#47a248", x: "-50px", y: "65%", z: 60, delay: 1.2 },
        { label: "UI/UX", color: "#a855f7", x: "calc(100% + 5px)", y: "70%", z: 45, delay: 1.4 },
      ].map((b) => (
        <motion.div
          key={b.label}
          style={{ translateZ: b.z, left: b.x, top: b.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: b.delay, duration: 0.4 },
            scale:   { delay: b.delay, duration: 0.4 },
            y:       { duration: 2.5 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: b.delay },
          }}
          className="absolute px-3 py-1.5 rounded-xl text-xs font-bold
            bg-black/70 backdrop-blur-md border border-white/10
            shadow-lg shadow-black/40 pointer-events-none"
        >
          <span style={{ color: b.color }}>{b.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#06060f]"
    >
      {/* 3D BG Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroBG3DCanvas />
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 0%, #06060f99 65%, #06060f 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-40 z-[1] pointer-events-none
          bg-gradient-to-t from-[#06060f] to-transparent"
      />

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]
          bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),
              linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]
          bg-[size:60px_60px]"
      />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto
          px-5 sm:px-8 lg:px-12
          pt-24 pb-16
          flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        {/* ── LEFT: TEXT ─────────────────────────────────────────────── */}
        <div className="flex-1 max-w-xl">

          {/* Badge */}
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
            Available for new projects
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black
              leading-[1.08] tracking-tight text-white"
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

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 text-white/65 text-base sm:text-lg leading-relaxed"
          >
            Full-stack web development, stunning UI/UX design &amp; SEO —
            engineered to be fast, scalable, and built for growth.
          </motion.p>

          {/* Buttons */}
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
              Explore Our Work →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl font-bold
                border border-white/30 bg-white/10 backdrop-blur-md
                text-white px-7 py-3.5 text-base
                hover:bg-white/20 hover:-translate-y-1
                active:scale-95 transition-all duration-200"
            >
              Start a Project
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4"
          >
            {[
              { label: "Projects Delivered", value: "50+" },
              { label: "Happy Clients",      value: "30+" },
              { label: "Years Experience",   value: "5+"  },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-2xl font-black text-white">{s.value}</span>
                <span className="text-white/45 text-xs font-semibold uppercase tracking-widest mt-0.5">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: 3D TILT CHARACTER ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="flex-shrink-0 hidden md:flex items-center justify-center"
          style={{ perspective: 800 }}
        >
          <TiltCard />
        </motion.div>
      </div>

      {/* Cursor hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden lg:flex absolute bottom-8 right-12 z-10 items-center gap-2"
        aria-hidden
      >
        <motion.span
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/25 text-xs tracking-widest uppercase font-medium"
        >
          Move cursor over card
        </motion.span>
        <div className="w-4 h-4 border border-white/25 rounded-full" />
      </motion.div>
    </section>
  );
}
