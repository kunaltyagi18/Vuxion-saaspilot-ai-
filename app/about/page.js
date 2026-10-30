import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "About Us | Vuxion",
  description: "Learn about Vuxion, our story, mission, vision, and the team behind your digital success.",
};

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85";

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <section id="our-story" className="relative overflow-hidden bg-white px-6 pb-24 pt-36 dark:bg-[#080810]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#6366f10b_1px,transparent_1px),linear-gradient(to_bottom,#6366f10b_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-indigo-400/15 blur-[110px] dark:bg-indigo-500/15" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-950/40 dark:text-indigo-300">
              About Us
            </span>
            <h1 className="mt-7 max-w-xl text-5xl font-black leading-[1.04] tracking-[-0.045em] text-gray-950 dark:text-white sm:text-6xl">
              We turn good ideas into <span className="text-indigo-600 dark:text-indigo-400">useful digital products.</span>
            </h1>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              <p>
                Vuxion is a full-stack digital studio helping startups, growing teams and ambitious businesses turn complex ideas into clear, useful experiences. We bring strategy, design and engineering together so your product looks sharp, works beautifully and supports real business goals.
              </p>
              <p>
                Our work starts with listening and understanding the problem behind the brief. We then shape a focused direction, create an intuitive experience and build dependable technology that is ready to grow with your team.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-indigo-700 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
              >
                Start a conversation <span aria-hidden>→</span>
              </Link>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Strategy, design and engineering in one team.</span>
            </div>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] shadow-2xl shadow-indigo-950/10 sm:min-h-[560px]">
            <Image
              src={ABOUT_IMAGE}
              alt="Vuxion team collaborating in a bright studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/5 to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 text-white">
              <p className="text-lg font-bold">Built together, built to last.</p>
              <p className="mt-1 text-sm text-white/75">Thoughtful collaboration from the first conversation to launch.</p>
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
      <Footer />
    </main>
  );
}
