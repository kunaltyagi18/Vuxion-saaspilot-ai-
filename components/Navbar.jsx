"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ADMIN_EMAIL } from "@/lib/config";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [darkMode, setDarkMode]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Track scroll position to switch navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  // ── Style variants based on scroll position ──────────────────────────────
  const navBg   = scrolled
    ? "bg-white/95 dark:bg-gray-900/95 border-gray-200/60 dark:border-gray-700/60 shadow-md shadow-black/10"
    : "bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 shadow-lg shadow-black/20";

  const textCol = scrolled
    ? "text-gray-700 dark:text-gray-200"
    : "text-white/90";

  const hoverCol = scrolled
    ? "hover:text-indigo-600 dark:hover:text-indigo-400"
    : "hover:text-white";

  const logoText = scrolled
    ? "text-indigo-600 dark:text-indigo-400"
    : "text-white";

  const logoBadge = scrolled
    ? "bg-indigo-600 text-white"
    : "bg-white/20 border border-white/30 text-white";

  const toggleBtn = scrolled
    ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    : "bg-white/10 hover:bg-white/20 text-white";

  const loginBtn = scrolled
    ? "bg-indigo-600 text-white hover:bg-indigo-700 border-transparent"
    : "border-white/40 text-white hover:bg-white/20 border";

  const navLinks = [
    { href: "/about",    label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/contact",  label: "Contact" },
  ];

  return (
    <>
      {/* ── Scroll Progress Bar ─────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* ── Floating Pill Navbar ─────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50
          w-[92vw] max-w-3xl px-4 sm:px-5 py-2.5
          flex items-center justify-between gap-3
          rounded-full backdrop-blur-xl border
          transition-all duration-300
          ${navBg}`}
      >
        {/* Logo */}
        <Link href="/" className={`text-lg sm:text-xl font-bold flex items-center gap-2 shrink-0 ${logoText}`}>
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${logoBadge}`}>
            V
          </span>
          <span className="hidden xs:inline">Vuxion</span>
        </Link>

        {/* Desktop nav links */}
        <div className={`hidden md:flex gap-4 lg:gap-5 items-center text-sm font-medium ${textCol}`}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className={`transition ${hoverCol}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-1.5 rounded-full transition flex items-center justify-center text-base ${toggleBtn}`}
            title="Toggle Theme"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {isSignedIn ? (
            <>
              {isAdmin && (
                <Link href="/admin" className={`hidden sm:block text-sm font-semibold transition ${scrolled ? "text-indigo-600 dark:text-indigo-400 hover:underline" : "text-white/80 hover:text-white"}`}>
                  Admin
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <SignInButton mode="modal">
              <button className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-semibold transition ${loginBtn}`}>
                Login
              </button>
            </SignInButton>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className={`md:hidden p-1.5 rounded-full transition ${toggleBtn}`}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown menu ─────────────────────────────────────────── */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-40
            w-[88vw] max-w-xs
            bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
            rounded-2xl border border-gray-200/60 dark:border-gray-700/60
            shadow-xl shadow-black/20 p-4
            flex flex-col gap-1 md:hidden"
        >
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition">
              Admin Panel
            </Link>
          )}
        </motion.div>
      )}
    </>
  );
}