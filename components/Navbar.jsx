"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ADMIN_EMAIL } from "@/lib/config";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  // Scroll progress bar — useScroll tracks how much page is scrolled
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });


  // page load hone pe check karo localStorage me theme saved hai ya nahi
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // dark/light mode toggle karne ka simple function
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

  // Check: kya current logged-in user admin hai?
  // Ye sirf navbar mein Admin link dikhane/chhupaane ke liye hai
  const isAdmin =
    isSignedIn &&
    user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

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
          w-auto max-w-3xl px-5 py-2.5
          flex items-center justify-between gap-6
          rounded-full
          bg-white/10 dark:bg-gray-900/20
          backdrop-blur-xl
          border border-white/20 dark:border-white/10
          shadow-lg shadow-black/20
          transition-colors duration-300"
        style={{ minWidth: "min(90vw, 760px)" }}
      >
      <Link href="/" className="text-xl font-bold text-white flex items-center gap-2 shrink-0">
        <span className="bg-white/20 border border-white/30 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black backdrop-blur-sm">V</span>
        Vuxion
      </Link>

      <div className="flex gap-3 md:gap-5 items-center text-sm font-medium text-white/80">
        <Link href="/about"    className="hover:text-white transition">About</Link>
        <Link href="/services" className="hover:text-white transition">Services</Link>
        <Link href="/projects" className="hover:text-white transition">Projects</Link>
        <Link href="/contact"  className="hover:text-white transition">Contact</Link>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center text-base"
          title="Toggle Theme"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        {isSignedIn ? (
          <>
            {isAdmin && (
              <Link href="/admin" className="text-white/80 hover:text-white font-semibold transition">
                Admin
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="border border-white/40 text-white px-4 py-1.5 rounded-full hover:bg-white/20 transition text-sm font-semibold">
              Login
            </button>
          </SignInButton>
        )}
      </div>
      </motion.nav>
    </>
  );
}