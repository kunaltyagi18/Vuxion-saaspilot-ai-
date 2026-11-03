"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} style={{ width: 12, height: 12, fill: "var(--studio-orange)" }} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then(setTestimonials)
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <section id="testimonials" className="studio-section studio-grid-section" style={{ background: "var(--studio-bg)" }}>
      {/* Section header */}
      <div className="studio-section-head">
        <div>
          <span className="studio-label">CLIENT VOICES</span>
          <h2>
            Real feedback, <em>real results.</em>
          </h2>
        </div>
        <p>Feedback from clients who trusted us with their digital vision.</p>
      </div>

      {testimonials.length === 0 ? (
        <p className="studio-mono" style={{ color: "var(--studio-muted)", textAlign: "center", padding: "60px 0" }}>
          Loading testimonials...
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 12 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              style={{
                background: "var(--studio-panel)",
                border: "1px solid var(--studio-line)",
                padding: "28px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transition: "border-color .25s ease, background .25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--studio-line-light)";
                e.currentTarget.style.background = "#141416";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--studio-line)";
                e.currentTarget.style.background = "var(--studio-panel)";
              }}
            >
              {/* Quote mark */}
              <span
                style={{
                  color: "var(--studio-orange)",
                  fontFamily: "var(--studio-display)",
                  fontSize: 52,
                  lineHeight: 0.7,
                  letterSpacing: "-.05em",
                }}
              >
                "
              </span>

              <StarRating count={t.rating} />

              <p style={{ color: "#b4b4bb", fontSize: 14, lineHeight: 1.65, flex: 1 }}>
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 16,
                  borderTop: "1px solid var(--studio-line)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--studio-orange)",
                    color: "var(--studio-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--studio-display)",
                    fontSize: 16,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {t.initials || t.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--studio-display)", fontSize: 14, letterSpacing: "-.03em", fontWeight: 600, color: "var(--studio-copy)" }}>
                    {t.name}
                  </p>
                  <p className="studio-mono" style={{ color: "var(--studio-muted)", fontSize: 9, marginTop: 2 }}>
                    {t.role?.toUpperCase()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
