"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Default fallback ────────────────────────────────────────────────────────
const DEFAULT = {
  tagline: "We build digital experiences that matter.",
  description:
    "Vuxion is a full-stack web development agency passionate about building fast, scalable, and beautiful web applications. We work closely with startups and businesses to bring their ideas to life.",
  image: "",
  mission:
    "To help businesses grow by delivering high-quality digital products — on time, on budget, and beyond expectations.",
  vision:
    "To become the most trusted web development partner for startups and SMEs across India.",
  stats: [
    { label: "Projects Delivered", value: "50+" },
    { label: "Happy Clients",      value: "30+" },
    { label: "Years Experience",   value: "5+"  },
    { label: "Team Members",       value: "8+"  },
  ],
  teamMembers: [
    { name: "Kunal Tyagi", role: "Founder & Full-Stack Dev", bio: "Passionate about building scalable web apps with Next.js and MongoDB.", image: "" },
    { name: "Team Member", role: "UI/UX Designer",           bio: "Crafting beautiful, user-centric interfaces that convert.",           image: "" },
  ],
};

const DEFAULT_ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85";

function AboutImage({ src }) {
  const imageSrc = src || DEFAULT_ABOUT_IMAGE;
  return (
    <div style={{ position: "relative", minHeight: 420, borderRadius: 0, overflow: "hidden", border: "1px solid var(--studio-line)" }}>
      <Image
        src={imageSrc}
        alt="Vuxion team collaborating"
        fill
        unoptimized
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-700"
        style={{ transition: "transform .7s ease" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,9,11,.7) 0%, transparent 60%)" }} />
      <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, color: "var(--studio-copy)" }}>
        <p className="studio-mono" style={{ fontSize: 9, color: "var(--studio-muted)", letterSpacing: ".12em", marginBottom: 6 }}>STUDIO / TEAM</p>
        <p style={{ fontFamily: "var(--studio-display)", fontSize: 22, letterSpacing: "-.04em", fontWeight: 600 }}>Built together, built to last.</p>
      </div>
    </div>
  );
}

export default function About({ preview = false }) {
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setData({ ...DEFAULT, ...d }); })
      .catch(() => {});
  }, []);

  return (
    <section
      id="about"
      className="studio-section studio-grid-section"
      style={{ background: "var(--studio-bg)" }}
    >
      {/* Section header */}
      <div className="studio-section-head">
        <div>
          <span className="studio-label">ABOUT / THE STUDIO</span>
          <h2>
            Who we <em>are.</em>
          </h2>
        </div>
        <p>{data.tagline}</p>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* LEFT — Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AboutImage src={data.image} />
        </motion.div>

        {/* RIGHT — Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{ display: "flex", flexDirection: "column", gap: 28 }}
        >
          {/* Description */}
          <p className="about-description" style={{ color: "#929297", fontSize: 14, lineHeight: 1.65 }}>{data.description}</p>

          {/* Mission */}
          <div
            style={{
              background: "var(--studio-panel)",
              border: "1px solid var(--studio-line)",
              padding: "20px 22px",
            }}
          >
            <p className="studio-label" style={{ marginBottom: 8 }}>MISSION</p>
            <p style={{ color: "var(--studio-copy)", fontSize: 13, lineHeight: 1.6 }}>{data.mission}</p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "1px solid var(--studio-line)",
            }}
            className="about-stats-grid"
          >
            {(data.stats || []).slice(0, 4).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                style={{
                  padding: "22px 18px",
                  borderRight: i % 2 === 0 ? "1px solid var(--studio-line)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--studio-line)" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--studio-display)",
                    fontSize: 38,
                    letterSpacing: "-.1em",
                    color: "var(--studio-orange)",
                    lineHeight: 0.9,
                    marginBottom: 8,
                  }}
                >
                  {s.value}
                </p>
                <p className="studio-mono" style={{ color: "var(--studio-muted)", fontSize: 9 }}>
                  {s.label.toUpperCase()}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          {preview ? (
            <Link href="/about" className="studio-button studio-button--accent" style={{ alignSelf: "flex-start" }}>
              How We Work <span className="studio-arrow">↗</span>
            </Link>
          ) : null}
        </motion.div>
      </div>

      {/* Full page extras (non-preview) */}
      {!preview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: 80 }}
        >
          {/* Vision */}
          <div
            style={{
              background: "var(--studio-panel)",
              border: "1px solid var(--studio-line)",
              padding: "32px 36px",
              marginBottom: 48,
            }}
          >
            <p className="studio-label" style={{ marginBottom: 12 }}>VISION</p>
            <p style={{ fontFamily: "var(--studio-display)", fontSize: "clamp(22px, 2.5vw, 34px)", letterSpacing: "-.05em", lineHeight: 1, color: "var(--studio-copy)", fontWeight: 600 }}>
              {data.vision}
            </p>
          </div>

          {/* Team */}
          {data.teamMembers?.length > 0 && (
            <>
              <div className="studio-section-head" style={{ marginBottom: 36 }}>
                <div>
                  <span className="studio-label">THE TEAM</span>
                  <h2 style={{ fontSize: "clamp(38px, 5vw, 65px)", marginTop: 12 }}>
                    Meet the <em>people.</em>
                  </h2>
                </div>
              </div>
              <div className="responsive-card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}>
                {data.teamMembers.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    style={{
                      background: "var(--studio-panel)",
                      border: "1px solid var(--studio-line)",
                      padding: "24px 26px",
                      transition: "border-color .25s ease, background .25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--studio-orange)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--studio-line)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          background: "var(--studio-orange)",
                          color: "var(--studio-bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--studio-display)",
                          fontSize: 20,
                          fontWeight: 800,
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        {member.image
                          ? <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          : member.name?.[0]?.toUpperCase()
                        }
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--studio-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-.03em", color: "var(--studio-copy)" }}>{member.name}</p>
                        <p className="studio-mono" style={{ color: "var(--studio-orange)", fontSize: 9, marginTop: 3 }}>{member.role?.toUpperCase()}</p>
                      </div>
                    </div>
                    <p style={{ color: "#929297", fontSize: 13, lineHeight: 1.55 }}>{member.bio}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          <div className="about-principles">
            <div className="about-principles-head">
              <div>
                <span className="studio-label">HOW WE THINK</span>
                <h2>Small details, <em>big trust.</em></h2>
              </div>
              <p>Our best work comes from staying curious, communicating early, and caring about what happens after launch.</p>
            </div>
            <div className="about-principles-grid">
              <article className="about-principle">
                <span>01</span>
                <h3>Start with the real problem.</h3>
                <p>We ask questions before recommending tools, features, or a larger build than you actually need.</p>
              </article>
              <article className="about-principle">
                <span>02</span>
                <h3>Make complexity feel simple.</h3>
                <p>Good design gives people confidence. We turn complicated workflows into clear next steps.</p>
              </article>
              <article className="about-principle">
                <span>03</span>
                <h3>Leave things better documented.</h3>
                <p>Your team should be able to run, update, and build on the product without waiting on us.</p>
              </article>
            </div>
          </div>
          <div className="about-relationship">
            <div>
              <span className="studio-label">THE WORKING RELATIONSHIP</span>
              <h2>Close enough to care. <em>Clear enough to trust.</em></h2>
            </div>
            <div>
              <p>We work in small loops: understand the context, make the next useful thing, share it early, and improve it together.</p>
              <Link href="/contact" className="studio-button studio-button--accent">Start a conversation <span className="studio-arrow">↗</span></Link>
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
