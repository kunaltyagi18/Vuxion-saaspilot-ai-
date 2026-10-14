import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Our Services | Vuxion",
  description: "Explore Vuxion's full range of services — Web Development, UI/UX Design, SEO, and more.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Capabilities, without the jargon"
        title="The right team for your"
        accent="next digital move."
        description="From a focused marketing site to a full product platform, we bring strategy, design and engineering together so you can move from idea to something people can actually use."
        stats={[
          { value: "2–6w", label: "typical launch window" },
          { value: "4", label: "core disciplines" },
          { value: "30d", label: "included support" },
          { value: "100%", label: "transparent scope" },
        ]}
        primaryLabel="Discuss your project"
        primaryHref="/contact"
      />

      <Services />

      <section className="relative overflow-hidden bg-white px-6 py-24 dark:bg-[#080810]">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">What you get with us</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">A better delivery experience, not just a deliverable.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">Every engagement is shaped around the stage you are in, with the context and documentation needed to keep decisions moving.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["A clear plan", "Goals, milestones and responsibilities agreed before production starts."],
              ["Weekly visibility", "Working demos and concise updates so progress never feels opaque."],
              ["Production quality", "Responsive UI, clean code, accessibility and performance considered from day one."],
              ["A clean handover", "Documentation, admin guidance and support after your launch."],
            ].map(([title, text], index) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white">0{index + 1}</span>
                <h3 className="mt-6 text-base font-bold text-gray-950 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-24 dark:bg-[#0a0a14]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Ways to work together</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">Start where the business needs you most.</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              ["01", "Discovery sprint", "A focused engagement to clarify the opportunity, user journeys, scope and a practical roadmap."],
              ["02", "Build and launch", "A complete design and development partnership for a website, web app or new digital product."],
              ["03", "Improve and grow", "Ongoing support for performance, new features, content systems and continuous refinement."],
            ].map(([number, title, text]) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">{number}</p>
                <h3 className="mt-10 text-xl font-bold text-gray-950 dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
                <a href="/contact" className="mt-6 inline-flex text-sm font-bold text-indigo-600 hover:underline dark:text-indigo-400">Talk it through →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Chatbot />
      <Footer />
    </main>
  );
}
