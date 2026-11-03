"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="studio-statement studio-grid-section"
      style={{
        background: "var(--studio-cream)",
        color: "var(--studio-bg)",
        borderTop: "1px solid var(--studio-line)",
      }}
    >
      {/* Number */}
      <div className="studio-statement-number studio-label" style={{ color: "#6f6a63" }}>
        05 / NEXT MOVE
      </div>

      {/* Copy */}
      <div className="studio-statement-copy">
        <h2>
          Ready to build something <em>extraordinary?</em>
        </h2>
        <p style={{ color: "#57534d", fontSize: 15, lineHeight: 1.6, marginTop: 40, marginBottom: 24, maxWidth: 360 }}>
          From concept to launch — we turn your vision into a high-performance digital product.
          Let&apos;s have a 15-minute discovery call, no obligations.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", marginBottom: 28 }}>
          <Link
            href="/contact"
            className="studio-button"
            style={{
              background: "var(--studio-bg)",
              color: "var(--studio-copy)",
              borderColor: "transparent",
            }}
          >
            Start a Project <span className="studio-arrow" style={{ color: "var(--studio-orange)" }}>↗</span>
          </Link>
          <Link
            href="/projects"
            className="studio-button"
            style={{
              border: "1px solid #c2b9ab",
              color: "var(--studio-bg)",
              background: "transparent",
            }}
          >
            View Our Work
          </Link>
        </div>

        <div className="studio-mono" style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", color: "#6f6a63", fontSize: 9 }}>
          {["FREE DISCOVERY CALL", "FIXED-PRICE QUOTES", "30-DAY SUPPORT INCLUDED"].map((item) => (
            <span key={item}>
              <span style={{ color: "var(--studio-orange)", marginRight: 6 }}>—</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Aside */}
      <div className="studio-statement-aside studio-mono" style={{ color: "#6f6a63", borderColor: "#c2b9ab" }}>
        DESIGN × ENGINEERING<br />
        SMALL TEAM / BIG CARE<br />
        NO HIDDEN FEES
      </div>
    </section>
  );
}
