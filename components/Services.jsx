"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const defaultServiceImages = [
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
];

const serviceImageMap = [
  {
    keywords: ["web", "website", "frontend", "backend", "fullstack", "full-stack", "next", "react"],
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["ui", "ux", "design", "figma", "wireframe", "prototype", "graphic"],
    images: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["seo", "search", "ranking", "marketing", "analytics", "growth"],
    images: [
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["mobile", "app", "android", "ios", "flutter", "react native"],
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["cloud", "devops", "aws", "azure", "deploy", "server", "hosting"],
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["ai", "ml", "machine learning", "chatbot", "automation", "data"],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

function pickServiceImage(title, index) {
  if (!title) return defaultServiceImages[index % defaultServiceImages.length];
  const lower = title.toLowerCase();
  for (const category of serviceImageMap) {
    if (category.keywords.some((kw) => lower.includes(kw))) {
      return category.images[index % category.images.length];
    }
  }
  return defaultServiceImages[index % defaultServiceImages.length];
}

export default function Services({ limit }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayed = limit ? services.slice(0, limit) : services;

  useEffect(() => {
    fetch("/api/services")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Services fetch error:", err);
        setServices([]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="services" className="studio-section studio-grid-section" style={{ background: "var(--studio-bg)" }}>
      {/* Section header */}
      <div className="studio-section-head">
        <div>
          <span className="studio-label">CAPABILITIES</span>
          <h2>
            Our premium <em>services.</em>
          </h2>
        </div>
        <p>High-quality solutions engineered to boost your digital presence and drive real results.</p>
      </div>

      {/* Loading skeleton */}
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
      ) : services.length === 0 ? (
        <p className="studio-mono" style={{ color: "var(--studio-muted)", textAlign: "center", padding: "60px 0" }}>
          Our services are coming soon — stay tuned.
        </p>
      ) : (
        <div className="studio-bento-grid responsive-card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gridTemplateRows: "unset" }}>
          {displayed.map((s, i) => {
            const cardImg = s.image || pickServiceImage(s.title, i);
            const idx = String(i + 1).padStart(2, "0");

            return (
              <motion.article
                key={s._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="studio-bento"
                style={{ minHeight: 360, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                {/* Image */}
                <div style={{ height: 180, position: "relative", flexShrink: 0, overflow: "hidden" }}>
                  <Image
                    src={cardImg}
                    alt={s.title || "Service image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform .6s ease" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,9,11,.75) 0%, transparent 55%)" }} />
                  {s.price && (
                    <div
                      className="studio-mono"
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        background: "var(--studio-orange)",
                        color: "var(--studio-bg)",
                        fontSize: 9,
                        letterSpacing: ".1em",
                        padding: "5px 10px",
                      }}
                    >
                      {s.price}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: "22px 24px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div className="studio-bento-top" style={{ marginBottom: 0 }}>
                      <span className="studio-label">{idx}</span>
                    </div>
                    <div className="studio-bento-copy" style={{ maxWidth: "none", marginTop: 10 }}>
                      <h3 style={{ fontSize: "clamp(18px, 2vw, 24px)", marginBottom: 10 }}>{s.title}</h3>
                      <p style={{ fontSize: 13 }}>{s.description}</p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="studio-text-link"
                    style={{ marginTop: 18, fontSize: 10 }}
                  >
                    Get started <span className="studio-arrow">↗</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* View All CTA */}
      {limit && services.length > limit && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ textAlign: "center", marginTop: 48 }}
        >
          <Link href="/services" className="studio-button studio-button--outline">
            View All Services <span className="studio-arrow">↗</span>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
