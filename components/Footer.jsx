"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

const serviceLinks = [
  "Web Development",
  "UI / UX Design",
  "SEO Optimization",
  "Mobile Apps",
];

export default function Footer() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    let active = true;

    fetch("/api/settings")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && data?.contact) setContact(data.contact);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  function scrollToTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer className="studio-footer" style={{ borderTop: "1px solid var(--studio-line)", marginTop: 0, maxWidth: "100%", padding: "40px max(28px, calc((100vw - 1328px) / 2))" }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, flex: 1, flexWrap: "wrap" }}>
        <Link className="studio-mark" href="/" style={{ textDecoration: "none" }}>
          <span className="studio-mark-box">V</span>
          <span style={{ color: "var(--studio-copy)" }}>VUXION</span>
        </Link>

        <span className="studio-mono" style={{ color: "var(--studio-muted)" }}>
          © {new Date().getFullYear()} VUXION STUDIO — ALL RIGHTS RESERVED
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="studio-mono"
            style={{ color: "var(--studio-muted)", fontSize: 10, letterSpacing: ".08em", textDecoration: "none", textTransform: "uppercase" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--studio-orange)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--studio-muted)")}
          >
            {l.label}
          </Link>
        ))}

        <Link
          href="/privacy"
          className="studio-mono"
          style={{ color: "var(--studio-muted)", fontSize: 10, letterSpacing: ".08em", textDecoration: "none", textTransform: "uppercase" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--studio-orange)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--studio-muted)")}
        >
          Privacy
        </Link>
        {contact?.email && (
          <a
            href={`mailto:${contact.email}`}
            className="studio-mono"
            style={{ color: "var(--studio-muted)", fontSize: 10, letterSpacing: ".08em", textDecoration: "none" }}
          >
            Email
          </a>
        )}
        {[
          ["GitHub", contact?.githubUrl],
          ["X / Twitter", contact?.twitterUrl],
          ["LinkedIn", contact?.linkedinUrl],
          ["Instagram", contact?.instagramUrl],
        ].filter(([, href]) => href).map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="studio-mono"
            style={{ color: "var(--studio-muted)", fontSize: 10, letterSpacing: ".08em", textDecoration: "none" }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
