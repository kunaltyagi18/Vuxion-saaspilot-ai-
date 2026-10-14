import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About Us | Vuxion",
  description: "Learn about Vuxion — our story, mission, vision, and the team behind your digital success.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="The studio behind the work"
        title="A small studio with a"
        accent="serious point of view."
        description="Vuxion partners with founders, growing teams and ambitious businesses to turn complex ideas into clear, useful digital products. We combine thoughtful design with dependable engineering—and stay close from first conversation to launch."
        stats={[
          { value: "50+", label: "products and launches" },
          { value: "5+", label: "years building online" },
          { value: "1:1", label: "senior collaboration" },
          { value: "30d", label: "post-launch support" },
        ]}
        primaryLabel="Meet the team"
        primaryHref="#our-story"
      />

      <section id="our-story" className="relative overflow-hidden bg-white px-6 py-24 dark:bg-[#080810]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Our point of view</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">Good digital work feels simple on the surface.</h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">Behind that simplicity is careful thinking: understanding the real problem, choosing the right level of technology, and making every interaction earn its place.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Clarity before code", "We align goals, audience and scope early so the work moves with purpose."],
              ["02", "Craft with restraint", "We prefer useful interfaces, fast experiences and systems that are easy to maintain."],
              ["03", "Partnership over handoff", "You get a thoughtful collaborator—not a black box that disappears after delivery."],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{number}</span>
                <h3 className="mt-8 text-lg font-bold text-gray-950 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
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
