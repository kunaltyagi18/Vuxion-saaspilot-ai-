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
    <main style={{ background: "var(--studio-bg)", minHeight: "100vh" }}>
      <Navbar />

      <style>{`
        .proj-card { background: var(--studio-panel); border: 1px solid var(--studio-line); padding: 28px 26px; transition: border-color .25s ease; }
        .proj-card:hover { border-color: var(--studio-orange); }
        .proj-detail-grid { display: grid; gap: 40px; grid-template-columns: 0.8fr 1.2fr; align-items: center; }
        @media(max-width:768px) { .proj-detail-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={{ paddingTop: 72 }}>
        <PageHero
          eyebrow="Selected work and thinking"
          title="Work that turns product thinking into"
          accent="momentum."
          description="A selection of digital products, platforms and experiences built with a clear purpose: make the business easier to understand, easier to use and ready for what comes next."
          stats={[
            { value: "50+",   label: "projects delivered" },
            { value: "4.9/5", label: "client experience" },
            { value: "90+",   label: "performance target" },
            { value: "∞",     label: "room to iterate" },
          ]}
          primaryLabel="Start a similar project"
          primaryHref="/contact"
        />

        {/* How we judge the work */}
        <section
          className="studio-section studio-grid-section"
          style={{ background: "var(--studio-panel-2, #141416)", borderTop: "1px solid var(--studio-line)" }}
        >
          <div className="studio-section-head">
            <div>
              <span className="studio-label">HOW WE JUDGE THE WORK</span>
              <h2>Beyond the <em>screenshot.</em></h2>
            </div>
            <p>The strongest projects balance business outcomes with the details users feel.</p>
          </div>

          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {[
              ["01", "Business fit",    "Does the product support a real goal — more qualified leads, faster operations, or a clearer buying decision?"],
              ["02", "User confidence", "Can someone understand what to do next without friction, guesswork or unnecessary complexity?"],
              ["03", "Long-term value", "Is the foundation flexible enough to evolve as the team, audience and product grow?"],
            ].map(([num, title, text]) => (
              <div key={num} className="proj-card">
                <span className="studio-mono" style={{ color: "var(--studio-orange)", fontSize: 10, display: "block", marginBottom: 20 }}>{num}</span>
                <h3 style={{ fontFamily: "var(--studio-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-.05em", color: "var(--studio-copy)", marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "#929297", fontSize: 13, lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <Projects />

        {/* What sits behind the screen */}
        <section
          className="studio-section studio-grid-section"
          style={{ background: "var(--studio-bg)", borderTop: "1px solid var(--studio-line)" }}
        >
          <div className="proj-detail-grid">
            <div>
              <span className="studio-label">WHAT SITS BEHIND THE SCREEN</span>
              <h2
                style={{
                  fontFamily: "var(--studio-display)",
                  fontSize: "clamp(32px, 4vw, 55px)",
                  fontWeight: 600,
                  letterSpacing: "-.07em",
                  lineHeight: 0.9,
                  marginTop: 16,
                  color: "var(--studio-copy)",
                }}
              >
                A project ready for{" "}
                <em style={{ color: "var(--studio-orange)", fontStyle: "normal" }}>real life.</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                ["Responsive by default", "Thoughtful behaviour across phones, tablets and large screens."],
                ["Fast where it counts",  "Lean assets, considered motion and performance-minded implementation."],
                ["Easy to evolve",        "A clean structure that your team can understand and extend."],
                ["Measured after launch", "We use feedback and data to decide what to improve next."],
              ].map(([title, text]) => (
                <div key={title} style={{ borderLeft: "2px solid var(--studio-orange)", paddingLeft: 14 }}>
                  <h3 style={{ fontFamily: "var(--studio-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-.03em", color: "var(--studio-copy)", marginBottom: 6 }}>{title}</h3>
                  <p style={{ color: "#929297", fontSize: 12, lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Chatbot />
      <Footer />
    </main>
  );
}
