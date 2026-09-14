"use client";
import { motion } from "framer-motion";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ADMIN_EMAIL } from "@/lib/config"; // sirf ek jagah se email constant

export default function Navbar() {
  const { isSignedIn, user } = useUser(); // user object bhi lo — email check ke liye
  const [darkMode, setDarkMode] = useState(false);

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
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 z-50 px-6 md:px-12 py-4 flex justify-between items-center transition-colors duration-300"
    >
      <Link href="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
        <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black">V</span>
        Vuxion
      </Link>

      <div className="flex gap-4 md:gap-6 items-center text-sm font-medium text-gray-600 dark:text-gray-300">
        <Link href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Services</Link>
        <Link href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Projects</Link>
        <Link href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</Link>

        {/* Dark / Light Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center"
          title="Toggle Theme"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        {isSignedIn ? (
          <>
            {/* Admin link sirf tab dikhao jab email admin ki ho — doston ko nahi dikhega */}
            {isAdmin && (
              <Link href="/admin" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                Admin
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition shadow-sm font-medium">
              Login
            </button>
          </SignInButton>
        )}
      </div>
    </motion.nav>
  );
}