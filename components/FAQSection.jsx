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
    <section
      className="studio-section studio-grid-section"
      style={{ background: "var(--studio-bg)", borderTop: "1px solid var(--studio-line)" }}
    >
      {/* Header */}
      <div className="studio-section-head">
        <div>
          <span className="studio-label">FAQ</span>
          <h2>
            Common <em>questions.</em>
          </h2>
        </div>
        <p>Everything you need to know before we start building together.</p>
      </div>

      {/* Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            style={{
              borderBottom: "1px solid var(--studio-line)",
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "22px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--studio-sans)",
                  fontSize: 15,
                  fontWeight: 500,
                  color: open === i ? "var(--studio-orange)" : "var(--studio-copy)",
                  lineHeight: 1.35,
                  transition: "color .2s ease",
                }}
              >
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--studio-mono)",
                  fontSize: 18,
                  color: open === i ? "var(--studio-orange)" : "var(--studio-muted)",
                  lineHeight: 1,
                  transition: "color .2s ease",
                }}
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
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    style={{
                      color: "#929297",
                      fontSize: 14,
                      lineHeight: 1.65,
                      paddingBottom: 22,
                      maxWidth: 680,
                    }}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
