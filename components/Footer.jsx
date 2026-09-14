"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// Social icon SVGs — inline rakhe hain taaki extra dependency na lage
const socials = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.7 5.36-5.26 5.65.41.35.78 1.04.78 2.1v3.11c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2H21.5l-7.51 8.58L23 22h-6.84l-5.36-7-6.13 7H1.4l8.03-9.18L1 2h7l4.85 6.4L18.244 2Zm-1.2 18h1.9L7.04 4H5.04l12 16Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .63 4.14C.34 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.27 2.15.56 2.91.3.79.71 1.46 1.39 2.13a5.9 5.9 0 0 0 2.13 1.39c.76.29 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.27 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.29-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.27-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63C19.1.34 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
      </svg>
    ),
  },
];

// Quick nav links — same anchors jo Navbar me use ho rahe hain
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Services list — UI me jo dikhate hain wahi
const serviceLinks = [
  "Web Development",
  "UI / UX Design",
  "SEO Optimization",
  "Mobile Apps",
];

export default function Footer() {
  // smooth scroll to top helper
  function scrollToTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* subtle top glow — Hero jaisa hi vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Top section — 4 column grid (responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="bg-indigo-600 text-white w-9 h-9 rounded-lg flex items-center justify-center text-base font-black shadow-md shadow-indigo-500/20">
                A
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                MyAgency
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
              We craft fast, scalable, and beautifully designed digital products
              that help brands grow online.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white dark:hover:border-indigo-600 flex items-center justify-center transition-all shadow-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-indigo-600 dark:bg-indigo-400 transition-all duration-300" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-indigo-600 dark:bg-indigo-400 transition-all duration-300" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5">📍</span>
                <span>Tech Hub, Sector 62, Noida, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5">✉️</span>
                <a
                  href="mailto:hello@myagency.com"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all"
                >
                  hello@myagency.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5">📞</span>
                <a
                  href="tel:+919876543210"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              MyAgency
            </span>
            . All rights reserved. Built with{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Next.js</span>{" "}
            &{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Tailwind</span>.
          </p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Back to top
            <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 dark:group-hover:bg-indigo-600 transition-all">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}