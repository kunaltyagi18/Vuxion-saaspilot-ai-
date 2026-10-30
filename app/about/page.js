import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About Us | Vuxion",
  description: "Learn about Vuxion, our story, mission, vision, and the team behind your digital success.",
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
        primaryLabel="Read our story"
        primaryHref="#our-story"
      />

      <section id="our-story" className="relative overflow-hidden bg-white px-6 py-24 dark:bg-[#080810]">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">About Vuxion</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">Digital work with a clear purpose.</h2>
            </div>

            <div className="space-y-7 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              <p>
                Vuxion is a full-stack digital studio helping startups, growing teams and ambitious businesses turn ideas into useful digital products. We bring strategy, design and engineering together so every decision supports the bigger picture.
              </p>
              <p>
                Our work starts with understanding the problem behind the brief. From there, we shape a focused direction, design an experience that feels natural and build technology that is fast, reliable and ready to grow. The result is not just a polished interface, but a product your team can confidently use and improve.
              </p>

              <div className="border-l-2 border-indigo-500 pl-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-gray-950 dark:text-white">Our approach</p>
                <p className="mt-2">
                  Clear communication, thoughtful details and a close partnership from the first conversation through launch and beyond.
                </p>
              </div>

              <div className="grid gap-7 border-t border-gray-200 pt-7 dark:border-gray-800 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-950 dark:text-white">Our mission</h3>
                  <p className="mt-2 text-sm">To help businesses grow with high-quality digital products that are practical, memorable and built to last.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-950 dark:text-white">Our promise</h3>
                  <p className="mt-2 text-sm">You get a senior-led partner who stays involved, explains the work clearly and cares about the outcome.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
      <Footer />
    </main>
  );
}
