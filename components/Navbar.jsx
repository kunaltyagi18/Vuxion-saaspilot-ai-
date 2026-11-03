"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { ADMIN_EMAIL } from "@/lib/config";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  const navLinks = [
    { href: "/about",    label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/contact",  label: "Contact" },
  ];

  return (
    <>
      {/* ── Scroll Progress Bar ──────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, background: "var(--studio-orange, #ff4a00)" }}
      />

      {/* ── Studio Nav ──────────────────────────────────────────────────── */}
      <nav className="studio-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        {/* Logo */}
        <Link className="studio-mark" href="/" aria-label="Vuxion home">
          <span className="studio-mark-box">V</span>
          <span>VUXION</span>
        </Link>

        {/* Desktop nav links */}
        <div className={`studio-navlinks ${open ? "is-open" : ""}`}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label.toUpperCase()}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" onClick={() => setOpen(false)}>
              ADMIN
            </Link>
          )}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button
                className="studio-nav-cta"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--studio-mono)",
                  fontSize: 10,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--studio-copy)",
                }}
              >
                Sign In
              </button>
            </SignInButton>
          )}

          <Link className="studio-nav-cta" href="/contact" style={{ display: "none" }} data-desktop>
            Start a project <span style={{ color: "var(--studio-orange)", fontSize: 16, lineHeight: 0.5 }}>↗</span>
          </Link>

          {/* Hamburger */}
          <button
            className="studio-menu"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </>
  );
}
