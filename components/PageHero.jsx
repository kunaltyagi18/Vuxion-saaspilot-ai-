import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  stats,
  primaryLabel = "Start a conversation",
  primaryHref = "/contact",
}) {
  return (
    <section
      className="studio-grid-section studio-page-hero"
      style={{
        background: "var(--studio-bg)",
        borderBottom: "1px solid var(--studio-line)",
        padding: "130px max(28px, calc((100vw - 1328px) / 2)) 90px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid lines */}
      <div
        aria-hidden
        style={{
          background: "linear-gradient(90deg, transparent calc(50% - .5px), var(--studio-line) 50%, transparent calc(50% + .5px))",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
          position: "absolute",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
        {/* Eyebrow */}
        <p className="studio-eyebrow">
          {eyebrow} <span style={{ color: "var(--studio-orange)", margin: "0 8px" }}>—</span>
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--studio-display)",
            fontSize: "clamp(48px, 7.5vw, 110px)",
            fontWeight: 600,
            letterSpacing: "-.075em",
            lineHeight: 0.87,
            margin: 0,
            color: "var(--studio-copy)",
          }}
        >
          {title}{" "}
          <em style={{ color: "var(--studio-orange)", fontStyle: "normal" }}>{accent}</em>
        </h1>

        {/* Description */}
        <p
          style={{
            color: "#a1a1a6",
            fontSize: 16,
            lineHeight: 1.55,
            margin: "35px 0 0 8px",
            maxWidth: 480,
          }}
        >
          {description}
        </p>

        {/* Actions */}
        <div className="studio-hero-actions" style={{ marginLeft: 8, marginTop: 32 }}>
          <Link href={primaryHref} className="studio-button studio-button--accent">
            {primaryLabel}{" "}
            <span className="studio-arrow">↗</span>
          </Link>
          <Link href="/projects" className="studio-button studio-button--outline">
            See our work{" "}
            <span className="studio-arrow">↗</span>
          </Link>
        </div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div
            className="studio-hero-specs studio-mono"
            style={{ marginLeft: 8, marginTop: 40 }}
          >
            {stats.map((s) => (
              <span key={s.label}>
                <b style={{ color: "var(--studio-orange)", fontWeight: 400, marginRight: 8 }}>
                  {s.value}
                </b>
                {s.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
