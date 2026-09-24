"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then(r => r.json())
      .then(setTestimonials)
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 overflow-hidden bg-gray-50 dark:bg-[#0a0a14] transition-colors duration-300"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-indigo-400/10 dark:bg-indigo-500/15 blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-xl mx-auto">
            Real feedback from real clients who trusted us with their digital vision.
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <p className="text-center text-gray-400 py-10">Loading testimonials...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 40, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                className="card-3d glow-hover bg-white dark:bg-gray-900 rounded-2xl p-7
                  border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4"
              >
                {/* Quote Icon */}
                <svg className="w-8 h-8 text-indigo-200 dark:text-indigo-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <StarRating count={t.rating} />
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className={`${t.color || "bg-indigo-600"} w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md`}>
                    {t.initials || t.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
