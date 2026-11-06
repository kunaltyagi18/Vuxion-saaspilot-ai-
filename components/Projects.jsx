"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const defaultProjectImages = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
];

export default function Projects({ limit }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayed = limit ? projects.slice(0, limit) : projects;

  useEffect(() => {
    fetch("/api/projects")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Projects fetch error:", err);
        setProjects([]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="studio-section studio-grid-section" style={{ background: "var(--studio-bg)" }}>
      <div className="studio-section-head">
        <div>
          <span className="studio-label">PORTFOLIO</span>
          <h2>
            Our featured <em>work.</em>
          </h2>
        </div>
        <p>Check out some of the awesome digital products we have crafted recently.</p>
      </div>

      {loading ? (
        <div className="responsive-card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: "var(--studio-panel)",
                border: "1px solid var(--studio-line)",
                height: 340,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="studio-mono" style={{ color: "var(--studio-muted)", textAlign: "center", padding: "60px 0" }}>
          Exciting projects coming soon — check back shortly!
        </p>
      ) : (
        <div className="responsive-card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          {displayed.map((p, i) => {
            const projectImg = p.image || defaultProjectImages[i % defaultProjectImages.length];
            const idx = String(i + 1).padStart(2, "0");

            return (
              <motion.article
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="studio-bento"
                style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 360 }}
              >
                {/* Image */}
                <div style={{ height: 190, position: "relative", flexShrink: 0, overflow: "hidden" }}>
                  <Image
                    src={projectImg}
                    alt={p.title || "Project screenshot"}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform .6s ease" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,9,11,.75) 0%, transparent 55%)" }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: "20px 22px 22px", display: "flex", flexDirection: "column" }}>
                  <div className="studio-bento-top" style={{ marginBottom: 0 }}>
                    <span className="studio-label">{idx}</span>
                  </div>

                  <div className="studio-bento-copy" style={{ maxWidth: "none", marginTop: 10, flex: 1 }}>
                    <h3 style={{ fontSize: "clamp(18px, 2vw, 24px)", marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {p.description}
                    </p>
                  </div>

                  {/* Tech tags */}
                  {p.techStack?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14 }}>
                      {p.techStack.slice(0, 4).map((t, j) => (
                        <span
                          key={j}
                          className="studio-mono"
                          style={{
                            border: "1px solid var(--studio-line-light)",
                            color: "var(--studio-muted)",
                            fontSize: 8,
                            letterSpacing: ".1em",
                            padding: "3px 8px",
                            textTransform: "uppercase",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-text-link"
                      style={{ marginTop: 16, fontSize: 10 }}
                    >
                      View Live Project <span className="studio-arrow">↗</span>
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* View All CTA */}
      {limit && projects.length > limit && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ textAlign: "center", marginTop: 48 }}
        >
          <Link href="/projects" className="studio-button studio-button--outline">
            View All Projects <span className="studio-arrow">↗</span>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
