"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

// Dynamic import — Three.js MUST be client-side only (no SSR)
const ScrollScene3DCanvas = dynamic(
  () => import("./ScrollScene3DCanvas"),
  { ssr: false, loading: () => null }
);

export default function ScrollScene3D() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#06060f]"
      style={{ height: "100vh", minHeight: 520 }}
      aria-label="3D interactive showcase"
    >
      {/* ── Three.js Canvas fills section ──────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <ScrollScene3DCanvas sectionRef={sectionRef} />
      </div>

      {/* ── Subtle vignette edges ──────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #06060f 100%)",
        }}
      />

      {/* ── Bottom fade into next section ─────────────────────────────── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none
          bg-gradient-to-t from-[#06060f] to-transparent"
      />
      {/* ── Top fade ──────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-32 z-[2] pointer-events-none
          bg-gradient-to-b from-[#06060f] to-transparent"
      />

      {/* ── Overlay text ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <span className="inline-block text-indigo-400 text-xs font-bold uppercase tracking-[0.25em] mb-5 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            ✦ Crafted with Precision
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl mx-auto mb-5"
            style={{ textShadow: "0 0 60px rgba(99,102,241,0.5)" }}>
            Where{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Code
            </span>{" "}
            Meets{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Art
            </span>
          </h2>

          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Scroll to morph — every pixel of your product is built with this
            level of obsession.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 rounded-2xl font-bold
                bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500
                text-white px-7 py-3.5 text-sm
                shadow-xl shadow-violet-700/40
                hover:shadow-violet-500/70 hover:-translate-y-1
                active:scale-95 transition-all duration-200 overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0
                  -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
              Start a Project →
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-2xl font-bold
                border border-white/20 bg-white/5 backdrop-blur-md
                text-white px-7 py-3.5 text-sm
                hover:bg-white/10 hover:-translate-y-1
                active:scale-95 transition-all duration-200"
            >
              View Services
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-8 rounded-full bg-gradient-to-b from-indigo-400 to-transparent opacity-60"
        />
        <span className="text-white/30 text-[10px] tracking-widest uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
