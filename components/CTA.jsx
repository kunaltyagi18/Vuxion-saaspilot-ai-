"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600" />

      {/* Animated noise/grain overlay for depth */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')]" />

      {/* Grid overlay */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow blobs */}
      <div aria-hidden className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-[80px]" />
      <div aria-hidden className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-400/20 blur-[80px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </span>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Ready to Build Something{" "}
            <span className="relative inline-block">
              Extraordinary?
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-white/60 rounded-full origin-left"
              />
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            From concept to launch — we turn your vision into a high-performance digital product.
            Let&apos;s have a 15-minute discovery call, no obligations.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 bg-white text-indigo-700 font-bold
                px-8 py-4 rounded-2xl text-base shadow-2xl shadow-indigo-900/30
                hover:shadow-white/20 hover:-translate-y-1 active:scale-95
                transition-all duration-200 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-indigo-100/60 to-white/0
                -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Start a Project
              <span className="transition-transform duration-200 group-hover:translate-x-1 text-lg">→</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold
                px-8 py-4 rounded-2xl text-base backdrop-blur-sm
                hover:bg-white/10 hover:-translate-y-1 active:scale-95
                transition-all duration-200"
            >
              View Our Work
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            {["✓ Free discovery call", "✓ Fixed-price quotes", "✓ 30-day support included"].map(item => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
