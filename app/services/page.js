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
    <main style={{ background: "var(--studio-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hover styles for server component cards */}
      <style>{`
        .srv-card { background: var(--studio-panel); border: 1px solid var(--studio-line); padding: 28px 26px; transition: border-color .25s ease; }
        .srv-card:hover { border-color: var(--studio-orange); }
        .way-card { background: var(--studio-panel); border: 1px solid var(--studio-line); padding: 32px 28px; transition: border-color .25s ease; position: relative; }
        .way-card:hover { border-color: var(--studio-orange); }
      `}</style>

      <div style={{ paddingTop: 72 }}>
        <PageHero
          eyebrow="Capabilities, without the jargon"
          title="The right team for your"
          accent="next digital move."
          description="From a focused marketing site to a full product platform, we bring strategy, design and engineering together so you can move from idea to something people can actually use."
          stats={[
            { value: "2–6w", label: "typical launch window" },
            { value: "4",    label: "core disciplines" },
            { value: "30d",  label: "included support" },
            { value: "100%", label: "transparent scope" },
          ]}
          primaryLabel="Discuss your project"
          primaryHref="/contact"
        />

        <Services />

        {/* What you get */}
        <section
          className="studio-section studio-grid-section"
          style={{ background: "var(--studio-panel-2, #141416)", borderTop: "1px solid var(--studio-line)" }}
        >
          <div className="studio-section-head">
            <div>
              <span className="studio-label">WHAT YOU GET</span>
              <h2>A better delivery <em>experience.</em></h2>
            </div>
            <p>Every engagement is shaped around the stage you are in, with the context and documentation needed to keep decisions moving.</p>
          </div>

          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
            {[
              ["01", "A clear plan",       "Goals, milestones and responsibilities agreed before production starts."],
              ["02", "Weekly visibility",  "Working demos and concise updates so progress never feels opaque."],
              ["03", "Production quality", "Responsive UI, clean code, accessibility and performance from day one."],
              ["04", "A clean handover",   "Documentation, admin guidance and support after your launch."],
            ].map(([num, title, text]) => (
              <div key={num} className="srv-card">
                <span
                  className="studio-mono"
                  style={{ color: "var(--studio-orange)", fontSize: 10, display: "block", marginBottom: 20 }}
                >
                  {num}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--studio-display)",
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: "-.05em",
                    color: "var(--studio-copy)",
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "#929297", fontSize: 13, lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ways to work */}
        <section
          className="studio-section studio-grid-section"
          style={{ background: "var(--studio-bg)", borderTop: "1px solid var(--studio-line)" }}
        >
          <div className="studio-section-head">
            <div>
              <span className="studio-label">WAYS TO WORK TOGETHER</span>
              <h2>Start where the business <em>needs you most.</em></h2>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {[
              ["01", "Discovery sprint", "A focused engagement to clarify the opportunity, user journeys, scope and a practical roadmap."],
              ["02", "Build and launch", "A complete design and development partnership for a website, web app or new digital product."],
              ["03", "Improve and grow", "Ongoing support for performance, new features, content systems and continuous refinement."],
            ].map(([num, title, text]) => (
              <div key={num} className="way-card">
                <span
                  className="studio-mono"
                  style={{ color: "var(--studio-orange)", fontSize: 10, display: "block", marginBottom: 32 }}
                >
                  {num}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--studio-display)",
                    fontSize: "clamp(18px, 2vw, 26px)",
                    fontWeight: 600,
                    letterSpacing: "-.05em",
                    color: "var(--studio-copy)",
                    marginBottom: 12,
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "#929297", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{text}</p>
                <a
                  href="/contact"
                  className="studio-text-link"
                  style={{ fontSize: 10, color: "var(--studio-orange)" }}
                >
                  Talk it through <span className="studio-arrow">↗</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Chatbot />
      <Footer />
    </main>
  );
}
