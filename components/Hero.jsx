"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// ── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard() {
  const cardRef = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const rotateY = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);

  function onMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const badges = [
    { label: "React",   color: "#61dafb", top: "18%", left: "-52px" },
    { label: "Next.js", color: "#e2e8f0", top: "28%", right: "-52px" },
    { label: "MongoDB", color: "#47a248", top: "62%", left: "-52px" },
    { label: "UI/UX",   color: "#c084fc", top: "72%", right: "-52px" },
  ];

  return (
    <div className="relative" style={{ width: 340, height: 380 }}>
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #7c3aed33, transparent 70%)" }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Spinning rings */}
      <motion.div
        className="absolute -inset-4 rounded-full border border-indigo-500/25 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-8 rounded-full border border-fuchsia-500/15 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* 3D tilt card */}
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateY, rotateX, width: "100%", height: "100%" }}
        className="relative rounded-3xl overflow-hidden cursor-none select-none
          border border-white/10 shadow-2xl shadow-violet-900/50
          bg-[#0d0d20]"
      >
        {/* Character image */}
        <img
          src="/hero-character.jpg"
          alt="Vuxion chibi tech mascot"
          className="w-full h-full object-cover object-center"
          style={{ display: "block" }}
        />

        {/* Subtle dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060f]/80 via-transparent to-transparent" />

        {/* Status pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2
          flex items-center gap-2 whitespace-nowrap
          bg-black/60 backdrop-blur-md border border-white/10
          text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Building your next product...
        </div>

        {/* Specular glint on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: useTransform(
              [useTransform(springX, [-0.5, 0.5], [0, 100]),
               useTransform(springY, [-0.5, 0.5], [0, 100])],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.1) 0%, transparent 55%)`
            ),
          }}
        />
      </motion.div>

      {/* Floating tech badges */}
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1, scale: 1,
            y: [0, -5, 0],
          }}
          transition={{
            opacity: { delay: 0.8 + i * 0.15, duration: 0.4 },
            scale:   { delay: 0.8 + i * 0.15, duration: 0.4 },
            y: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
          }}
          style={{ top: b.top, left: b.left, right: b.right, position: "absolute" }}
          className="px-3 py-1.5 rounded-xl text-xs font-bold
            bg-black/70 backdrop-blur-md border border-white/15
            shadow-lg pointer-events-none z-20"
        >
          <span style={{ color: b.color }}>{b.label}</span>
        </motion.div>
      ))}
    </div>
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
    >      {/* Vignette */}
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
