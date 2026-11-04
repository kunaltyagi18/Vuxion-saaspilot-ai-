"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const DEFAULT_BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
];

export default function BlogTeaser() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.ok ? r.json() : [])
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  const featuredPosts = posts.slice(0, 3).map((post, i) => ({
    ...post,
    cardImage: post.image || DEFAULT_BLOG_IMAGES[i % DEFAULT_BLOG_IMAGES.length],
  }));

  if (!posts.length) return null;

  return (
    <section
      className="studio-section studio-grid-section"
      style={{ background: "var(--studio-bg)", borderTop: "1px solid var(--studio-line)" }}
    >
      <div className="studio-section-head">
        <div>
          <span className="studio-label">INSIGHTS</span>
          <h2>
            From our <em>blog.</em>
          </h2>
        </div>
        <Link href="/contact" className="studio-text-link" style={{ fontSize: 10 }}>
          View All Posts <span className="studio-arrow">↗</span>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
        {featuredPosts.map((post, i) => (
          <motion.article
            key={post._id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            style={{
              background: "var(--studio-panel)",
              border: "1px solid var(--studio-line)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "border-color .25s ease, background .25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--studio-orange)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--studio-line)";
            }}
          >
            {/* Image */}
            <div style={{ height: 160, position: "relative", overflow: "hidden", flexShrink: 0 }}>
              <img
                src={post.cardImage}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease", display: "block" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,9,11,.6) 0%, transparent 55%)" }} />
              {post.category && (
                <span
                  className="studio-mono"
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "var(--studio-orange)",
                    color: "var(--studio-bg)",
                    fontSize: 8,
                    letterSpacing: ".12em",
                    padding: "4px 9px",
                    textTransform: "uppercase",
                  }}
                >
                  {post.category}
                </span>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span className="studio-mono" style={{ color: "var(--studio-muted)", fontSize: 8 }}>{post.date}</span>
                <span className="studio-mono" style={{ color: "var(--studio-muted)", fontSize: 8 }}>{post.readTime}</span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--studio-display)",
                  fontSize: "clamp(16px, 1.8vw, 22px)",
                  fontWeight: 600,
                  letterSpacing: "-.04em",
                  lineHeight: 0.97,
                  color: "var(--studio-copy)",
                  marginBottom: 12,
                  flex: 1,
                }}
              >
                {post.title}
              </h3>

              <p style={{ color: "#929297", fontSize: 12, lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {post.excerpt}
              </p>

              <div style={{ borderTop: "1px solid var(--studio-line)", paddingTop: 14 }}>
                {post.link ? (
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="studio-text-link" style={{ fontSize: 9 }}>
                    Read More <span className="studio-arrow">↗</span>
                  </a>
                ) : (
                  <span className="studio-text-link" style={{ fontSize: 9, color: "var(--studio-orange)" }}>
                    Read More <span className="studio-arrow">↗</span>
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
