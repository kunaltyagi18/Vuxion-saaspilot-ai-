"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const BACKGROUND_IMAGE_URL = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=85&w=2070&auto=format&fit=crop";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300 pt-28 pb-12"
    >
      {/* ── BACKGROUND IMAGE ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <motion.img
          style={{ y, opacity }}
          src={BACKGROUND_IMAGE_URL}
          alt="Workspace Background"
          className="w-full h-full object-cover object-right"
        />
        {/* Gradient overlay for text legibility (Left side white/black, right side transparent) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/25 dark:from-gray-950 dark:via-gray-950/90 dark:to-gray-950/20" />
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10" />
        
        {/* Bottom fade for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent dark:from-gray-950" />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col h-full">
        
        {/* Top Section: Text left, image right */}
        <div className="flex-1 flex flex-col justify-center mt-10 md:mt-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 shadow-sm backdrop-blur-sm dark:border-indigo-400/20 dark:bg-gray-900/70 dark:text-indigo-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Digital product studio · Noida / Remote
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[1.02] text-gray-900 dark:text-white font-[family-name:var(--font-playfair)]"
            >
              Engineering digital<br/><span className="text-indigo-600 dark:text-indigo-400">excellence.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium"
            >
              We design and build thoughtful websites, web apps, and digital platforms that help ambitious teams launch with confidence.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl bg-gray-900 text-white hover:bg-indigo-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg shadow-gray-900/15"
              >
                Explore services <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-xl border border-gray-300/90 bg-white/70 text-gray-800 hover:border-indigo-300 hover:text-indigo-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-100 dark:hover:border-indigo-500 dark:hover:text-indigo-300 transition-all duration-200 backdrop-blur-sm"
              >
                See selected work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-gray-600 dark:text-gray-400"
            >
              <span className="inline-flex items-center gap-2"><span className="text-emerald-600 dark:text-emerald-400">✓</span> Clear communication</span>
              <span className="inline-flex items-center gap-2"><span className="text-emerald-600 dark:text-emerald-400">✓</span> Built for performance</span>
              <span className="inline-flex items-center gap-2"><span className="text-emerald-600 dark:text-emerald-400">✓</span> 30-day support</span>
            </motion.div>
          </div>
        </div>

        {/* ── EXPERTISE CARDS (Overlapping bottom) ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-16 lg:mt-24 w-full pb-4"
        >
          <div className="text-center mb-10 lg:hidden">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-playfair)]">
              Our Expertise
            </h2>
          </div>
          
          <div className="relative">
            {/* Absolute heading for desktop (looks nicer when integrated into the cards layout) */}
            <div className="hidden lg:block absolute -top-14 left-1/2 -translate-x-1/2">
               <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-playfair)] text-center bg-white/50 dark:bg-black/50 backdrop-blur-md px-6 py-2 rounded-2xl">
                Our Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left relative z-10">
              {/* Card 1 */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-2xl hover:-translate-y-1 transition-transform duration-300 group">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-inter)]">Software Development</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                  Custom applications, scalable systems, and full-stack solutions tailored to your unique business needs.
                </p>
                <Link href="/services#software" className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white group-hover:underline">
                  Learn More <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-2xl hover:-translate-y-1 transition-transform duration-300 group">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-inter)]">UI/UX Design</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                  Intuitive interfaces, user-centric experiences, and compelling digital product design.
                </p>
                <Link href="/services#design" className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white group-hover:underline">
                  Learn More <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-2xl hover:-translate-y-1 transition-transform duration-300 group">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-inter)]">Cloud & DevOps</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                  Secure architecture, seamless cloud migration, and automated deployments for maximum reliability.
                </p>
                <Link href="/services#cloud" className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white group-hover:underline">
                  Learn More <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
