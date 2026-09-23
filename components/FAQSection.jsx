"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "Most projects are delivered in 2–6 weeks depending on complexity. A landing page takes ~2 weeks, a full web app with backend typically 4–8 weeks. We'll give you a precise timeline after our discovery call.",
  },
  {
    q: "What technologies do you use?",
    a: "We primarily build with Next.js, React, Node.js, and MongoDB/PostgreSQL. For design, we use Figma. We choose the best stack for your specific project — not just what we're comfortable with.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes! Every project includes 30 days of free bug-fix support. After that, we offer monthly maintenance packages covering updates, backups, and priority support.",
  },
  {
    q: "How many revisions are included?",
    a: "Unlimited revisions during the design phase, and 3 rounds of revisions during development. We work iteratively so you're never surprised — you see progress at every stage.",
  },
  {
    q: "Can I manage the website myself after launch?",
    a: "Absolutely. We build a custom admin panel so you can update content, manage leads, add services/projects — all without touching any code.",
  },
  {
    q: "What is your payment structure?",
    a: "We work on a 50/50 model — 50% to start the project, 50% on delivery. For larger projects, we offer milestone-based payments. No hidden fees, ever.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-white dark:bg-[#080810] transition-colors duration-300">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base">
            Everything you need to know before we start building together.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden
                ${open === i
                  ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-md shadow-indigo-500/10"
                  : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
              >
                <span className={`font-semibold text-base transition-colors duration-200 ${
                  open === i
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                }`}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                    open === i
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  }`}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
