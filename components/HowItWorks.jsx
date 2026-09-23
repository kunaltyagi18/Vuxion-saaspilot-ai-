"use client";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Discover",
    description: "We deep-dive into your goals, audience, and market to craft a clear strategy before writing a single line of code.",
    color: "from-indigo-500 to-violet-500",
    glow: "shadow-indigo-500/20",
  },
  {
    number: "02",
    icon: "🎨",
    title: "Design",
    description: "Our designers create stunning wireframes and high-fidelity mockups that bring your vision to life with pixel-perfect precision.",
    color: "from-violet-500 to-fuchsia-500",
    glow: "shadow-violet-500/20",
  },
  {
    number: "03",
    icon: "⚙️",
    title: "Develop",
    description: "We build fast, scalable, and clean code using modern tech stacks — optimised for performance, SEO, and maintainability.",
    color: "from-fuchsia-500 to-pink-500",
    glow: "shadow-fuchsia-500/20",
  },
  {
    number: "04",
    icon: "🚀",
    title: "Deploy",
    description: "After rigorous testing, we launch your product and provide ongoing support to ensure everything runs flawlessly.",
    color: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-white dark:bg-[#080810] transition-colors duration-300">
      {/* BG grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div aria-hidden className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            How We Work
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-xl mx-auto">
            A proven 4-step process that delivers results on time, every time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line — desktop only */}
          <div aria-hidden className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400 opacity-30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className={`card-3d glow-hover relative flex flex-col items-center text-center
                bg-gray-50 dark:bg-gray-900/80
                border border-gray-100 dark:border-gray-800
                rounded-2xl p-8 shadow-md ${step.glow}`}
            >
              {/* Number badge */}
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                {step.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-2 border-indigo-400 text-[10px] font-black text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  {step.number.slice(1)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
