"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ADMIN_EMAIL } from "@/lib/config";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Theme persistence on load
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
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50
          w-[92vw] max-w-3xl px-5 py-2.5
          flex items-center justify-between gap-3
          rounded-full backdrop-blur-xl
          bg-white/80 dark:bg-gray-900/70
          border border-gray-200/50 dark:border-white/10
          shadow-lg shadow-black/10 dark:shadow-black/30
          transition-colors duration-300"
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center gap-2 shrink-0
          text-indigo-600 dark:text-white">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black
            bg-indigo-600 text-white
            dark:bg-white/20 dark:border dark:border-white/30">
            V
          </span>
          Vuxion
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-5 items-center text-sm font-medium
          text-gray-600 dark:text-white/80">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href}
              className="hover:text-indigo-600 dark:hover:text-white transition">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Dark/light toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-full transition flex items-center justify-center text-base
              bg-gray-100 hover:bg-gray-200 text-gray-600
              dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
            title="Toggle Theme"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {isSignedIn ? (
            <>
              {isAdmin && (
                <Link href="/admin"
                  className="hidden sm:block text-sm font-semibold transition
                    text-indigo-600 dark:text-white/80
                    hover:text-indigo-700 dark:hover:text-white">
                  Admin
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="px-4 py-1.5 rounded-full text-sm font-semibold transition
                border border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white
                dark:border-white/40 dark:text-white dark:hover:bg-white/20">
                Login
              </button>
            </SignInButton>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden p-1.5 rounded-full transition
              bg-gray-100 hover:bg-gray-200 text-gray-600
              dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown ───────────────────────────────────────────────── */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-40
            w-[88vw] max-w-xs backdrop-blur-xl rounded-2xl
            bg-white/95 dark:bg-gray-900/95
            border border-gray-200/60 dark:border-white/10
            shadow-xl shadow-black/20 p-4
            flex flex-col gap-1 md:hidden"
        >
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition
                text-gray-700 dark:text-white/80
                hover:bg-indigo-50 dark:hover:bg-white/10
                hover:text-indigo-600 dark:hover:text-white">
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition
                text-indigo-600 dark:text-indigo-400
                hover:bg-indigo-50 dark:hover:bg-white/10">
              Admin Panel
            </Link>
          )}
        </motion.div>
      )}
    </>
  );
}