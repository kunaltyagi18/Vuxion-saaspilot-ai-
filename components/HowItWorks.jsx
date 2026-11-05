"use client";
import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Discover",  description: "We deep-dive into your goals, audience, and market to craft a clear strategy before writing a single line of code." },
  { number: "02", title: "Design",    description: "Our designers create wireframes and high-fidelity mockups that bring your vision to life with pixel-perfect precision." },
  { number: "03", title: "Develop",   description: "We build fast, scalable, clean code using modern tech stacks — optimised for performance, SEO, and maintainability." },
  { number: "04", title: "Deploy",    description: "After rigorous testing, we launch your product and provide ongoing support to ensure everything runs flawlessly." },
];

export default function HowItWorks() {
  return (
    <section
      className="studio-section studio-grid-section"
      style={{ background: "var(--studio-bg)", borderTop: "1px solid var(--studio-line)" }}
    >
      <div className="studio-section-head">
        <div>
          <span className="studio-label">OUR PROCESS</span>
          <h2>
            How we <em>work.</em>
          </h2>
        </div>
        <p>A proven 4-step process that delivers results on time, every time.</p>
      </div>

      {/* Steps — horizontal numbered grid */}
      <div
        className="responsive-card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: 0,
          border: "1px solid var(--studio-line)",
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              background: "var(--studio-panel)",
              borderRight: i < steps.length - 1 ? "1px solid var(--studio-line)" : "none",
              padding: "32px 26px",
              transition: "background .25s ease, border-color .25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--studio-orange)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--studio-line)";
            }}
          >
            <p
              className="studio-mono"
              style={{
                color: "var(--studio-orange)",
                fontSize: 10,
                letterSpacing: ".15em",
                marginBottom: 22,
              }}
            >
              {step.number}
            </p>
            <h3
              style={{
                fontFamily: "var(--studio-display)",
                fontSize: "clamp(22px, 2.2vw, 30px)",
                fontWeight: 600,
                letterSpacing: "-.06em",
                lineHeight: 0.9,
                color: "var(--studio-copy)",
                marginBottom: 14,
              }}
            >
              {step.title}
            </h3>
            <p style={{ color: "#929297", fontSize: 13, lineHeight: 1.6 }}>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
