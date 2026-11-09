"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DEFAULT_TECHS = [
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

const DEFAULT_WHY = [
  { icon: "⚡", title: "Lightning Fast",      desc: "Optimised for Core Web Vitals — 90+ Lighthouse scores as standard." },
  { icon: "—",  title: "Premium Design",      desc: "Every pixel is intentional. We don't do average." },
  { icon: "○",  title: "Secure by Default",  desc: "Auth, rate limiting, and encryption built-in from day one." },
  { icon: "↑",  title: "SEO Optimised",       desc: "Structured data, meta tags, sitemaps — rank higher from launch." },
  { icon: "→",  title: "Dedicated Support",  desc: "Slack access, weekly calls, and fast response times throughout." },
  { icon: "=",  title: "Transparent Pricing", desc: "No hidden costs. Fixed quotes. You always know what you're paying." },
];

export default function WhyUs() {
  const [techs, setTechs] = useState(DEFAULT_TECHS);
  const [whyUs, setWhyUs] = useState(DEFAULT_WHY);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => {
        if (!d) return;
        if (Array.isArray(d.techStack)) setTechs(d.techStack);
        if (Array.isArray(d.whyUs))     setWhyUs(d.whyUs);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="studio-section studio-grid-section" style={{ background: "var(--studio-panel-2, #141416)", borderTop: "1px solid var(--studio-line)" }}>
        <div className="studio-section-head">
          <div>
            <span className="studio-label">WHY VUXION</span>
            <h2>
              Why clients <em>choose us.</em>
            </h2>
          </div>
          <p>We don&apos;t just build websites — we build digital assets that grow your business.</p>
        </div>

        <div className="responsive-card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}>
          {whyUs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              style={{
                background: "var(--studio-panel)",
                border: "1px solid var(--studio-line)",
                padding: "28px 26px",
                transition: "border-color .25s ease, background .25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--studio-orange)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--studio-line)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--studio-display)",
                  fontSize: 32,
                  color: "var(--studio-orange)",
                  display: "block",
                  marginBottom: 18,
                  lineHeight: 1,
                }}
              >
                {item.icon}
              </span>
              <h3
                style={{
                  fontFamily: "var(--studio-display)",
                  fontSize: "clamp(17px, 1.8vw, 22px)",
                  fontWeight: 600,
                  letterSpacing: "-.05em",
                  color: "var(--studio-copy)",
                  marginBottom: 10,
                  lineHeight: 0.95,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#929297", fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK MARQUEE ───────────────────────────────────────── */}
      <section
        style={{
          background: "var(--studio-bg)",
          borderTop: "1px solid var(--studio-line)",
          borderBottom: "1px solid var(--studio-line)",
          overflow: "hidden",
          padding: "40px 0",
          position: "relative",
        }}
      >
        <p
          className="studio-mono"
          style={{
            color: "var(--studio-muted)",
            fontSize: 9,
            letterSpacing: ".18em",
            marginBottom: 24,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Technologies We Master
        </p>

        <div style={{ position: "relative" }}>
          {/* Fade left */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, var(--studio-bg), transparent)", zIndex: 10, pointerEvents: "none" }} />
          {/* Fade right */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, var(--studio-bg), transparent)", zIndex: 10, pointerEvents: "none" }} />

          <div className="animate-marquee">
            {[...techs, ...techs].map((tech, i) => (
              <span
                key={i}
                className="studio-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid var(--studio-line)",
                  color: "#77777d",
                  cursor: "default",
                  fontSize: 10,
                  letterSpacing: ".12em",
                  margin: "0 6px",
                  padding: "10px 20px",
                  whiteSpace: "nowrap",
                  transition: "border-color .2s ease, color .2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--studio-orange)";
                  e.currentTarget.style.color = "var(--studio-orange)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--studio-line)";
                  e.currentTarget.style.color = "#77777d";
                }}
              >
                {tech.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
