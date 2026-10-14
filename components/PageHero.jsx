import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  stats,
  primaryLabel = "Start a conversation",
  primaryHref = "/contact",
}) {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] px-6 pb-20 pt-36 dark:bg-[#080810]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f10b_1px,transparent_1px),linear-gradient(to_bottom,#6366f10b_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-400/15 blur-[110px] dark:bg-indigo-500/15" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-violet-400/10 blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 shadow-sm dark:border-indigo-400/20 dark:bg-gray-900/70 dark:text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.045em] text-gray-950 dark:text-white sm:text-6xl lg:text-7xl">
            {title} <span className="text-indigo-600 dark:text-indigo-400">{accent}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-indigo-700 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
            >
              {primaryLabel} <span aria-hidden>→</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-gray-800 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-100 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
            >
              See our work
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200/80 bg-white/80 p-6 shadow-xl shadow-indigo-950/5 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/75">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-5 dark:border-gray-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">At a glance</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">Practical thinking. Measurable delivery.</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">Available</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-950/70">
                <p className="text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white">V</span>
            <p className="text-xs leading-relaxed text-indigo-900 dark:text-indigo-200">A senior-led team that keeps strategy, design and development in the same conversation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
