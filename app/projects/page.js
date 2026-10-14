import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Projects & Portfolio | Vuxion",
  description: "Browse Vuxion's complete portfolio — web apps, e-commerce, dashboards, and more.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Selected work and thinking"
        title="Work that turns product thinking into"
        accent="momentum."
        description="A selection of digital products, platforms and experiences built with a clear purpose: make the business easier to understand, easier to use and ready for what comes next."
        stats={[
          { value: "50+", label: "projects delivered" },
          { value: "4.9/5", label: "client experience" },
          { value: "90+", label: "performance target" },
          { value: "∞", label: "room to iterate" },
        ]}
        primaryLabel="Start a similar project"
        primaryHref="/contact"
      />

      <section className="relative overflow-hidden bg-white px-6 py-24 dark:bg-[#080810]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">How we judge the work</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">A polished interface is the starting point.</h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">The strongest projects balance business outcomes with the details users feel. That is why we look beyond the screenshot.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Business fit", "Does the product support a real goal—more qualified leads, faster operations, or a clearer buying decision?"],
              ["User confidence", "Can someone understand what to do next without friction, guesswork or unnecessary complexity?"],
              ["Long-term value", "Is the foundation flexible enough to evolve as the team, audience and product grow?"],
            ].map(([title, text], index) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-7 dark:border-gray-800 dark:bg-gray-900">
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">0{index + 1}</span>
                <h3 className="mt-8 text-lg font-bold text-gray-950 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Projects />

      <section className="bg-gray-50 px-6 py-24 dark:bg-[#0a0a14]">
        <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">What sits behind the screen</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white">A project that is ready for real life.</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["Responsive by default", "Thoughtful behaviour across phones, tablets and large screens."],
                ["Fast where it counts", "Lean assets, considered motion and performance-minded implementation."],
                ["Easy to evolve", "A clean structure that your team can understand and extend."],
                ["Measured after launch", "We use feedback and data to decide what to improve next."],
              ].map(([title, text]) => (
                <div key={title} className="border-l-2 border-indigo-500 pl-4">
                  <h3 className="text-sm font-bold text-gray-950 dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
      <Footer />
    </main>
  );
}
