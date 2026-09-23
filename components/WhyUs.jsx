"use client";
import { motion } from "framer-motion";

const techs = [
  { name: "Next.js",      icon: "▲" },
  { name: "React",        icon: "⚛️" },
  { name: "Node.js",      icon: "🟢" },
  { name: "MongoDB",      icon: "🍃" },
  { name: "TypeScript",   icon: "🔷" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Figma",        icon: "🖌️" },
  { name: "PostgreSQL",   icon: "🐘" },
  { name: "AWS",          icon: "☁️" },
  { name: "Docker",       icon: "🐳" },
  { name: "GraphQL",      icon: "◈" },
  { name: "Redis",        icon: "🔴" },
  { name: "Stripe",       icon: "💳" },
  { name: "Vercel",       icon: "▲" },
];

const whyUs = [
  { icon: "⚡", title: "Lightning Fast", desc: "Optimised for Core Web Vitals — 90+ Lighthouse scores as standard." },
  { icon: "🎨", title: "Premium Design", desc: "Every pixel is intentional. We don't do average." },
  { icon: "🔒", title: "Secure by Default", desc: "Auth, rate limiting, and encryption built-in from day one." },
  { icon: "📈", title: "SEO Optimised", desc: "Structured data, meta tags, sitemaps — rank higher from launch." },
  { icon: "🤝", title: "Dedicated Support", desc: "Slack access, weekly calls, and fast response times throughout." },
  { icon: "💰", title: "Transparent Pricing", desc: "No hidden costs. Fixed quotes. You always know what you're paying." },
];

export default function WhyUs() {
  return (
    <>
      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden bg-gray-50 dark:bg-[#0a0a14] transition-colors duration-300">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div aria-hidden className="pointer-events-none absolute -top-32 left-0 w-96 h-96 rounded-full bg-indigo-400/10 dark:bg-indigo-500/15 blur-[120px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
              Why Vuxion
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              Why Clients Choose Us
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-xl mx-auto">
              We don&apos;t just build websites — we build digital assets that grow your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="card-3d glow-hover bg-white dark:bg-gray-900 rounded-2xl p-7
                  border border-gray-100 dark:border-gray-800 shadow-sm group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-2xl mb-4
                  group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK MARQUEE ────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white dark:bg-[#080810] overflow-hidden border-y border-gray-100 dark:border-gray-800/50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Technologies We Master
          </p>
        </div>

        {/* Marquee wrapper */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#080810] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#080810] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-marquee">
            {[...techs, ...techs].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 shrink-0
                  bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                  px-5 py-3 rounded-full shadow-sm
                  hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md
                  transition-all duration-200 cursor-default"
              >
                <span className="text-lg">{tech.icon}</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
