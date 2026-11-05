"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

function Arrow() {
  return <span aria-hidden="true" className="studio-arrow">↗</span>;
}

function PricingCard({ num, title, desc, features }) {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const showOrange = active || hovered;

  return (
    <div
      style={{
        background: "var(--studio-panel)",
        border: `1px solid ${showOrange ? "var(--studio-orange)" : "var(--studio-line)"}`,
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        transition: "border-color .25s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setActive(a => !a)}
    >
      <span className="studio-mono" style={{ color: "var(--studio-orange)", fontSize: 10, marginBottom: 24, display: "block" }}>{num}</span>
      <h3 style={{ fontFamily: "var(--studio-display)", fontSize: 32, fontWeight: 600, letterSpacing: "-.07em", color: "var(--studio-copy)", margin: "0 0 6px" }}>{title}</h3>
      <p style={{ color: "#929297", fontSize: 13, lineHeight: 1.65, margin: "0 0 28px" }}>{desc}</p>
      <ul style={{ listStyle: "none", margin: "0 0 auto", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {features.map(f => (
          <li key={f} style={{ color: "#929297", fontSize: 13, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "var(--studio-orange)", fontSize: 14, lineHeight: 1 }}>—</span> {f}
          </li>
        ))}
      </ul>
      <div style={{ borderTop: "1px solid var(--studio-line)", marginTop: 32, paddingTop: 24 }}>
        <Link
          href="/contact"
          className="studio-button studio-button--outline"
          style={{ width: "100%", justifyContent: "space-between" }}
          onClick={e => e.stopPropagation()}
        >
          Discuss a quote <Arrow />
        </Link>
      </div>
    </div>
  );
}

export default function StudioHome() {
  return (
    <div className="studio-shell human-home">
      <Navbar />

      <main>
        <section className="human-hero studio-grid-section">
          <div className="human-hero-main">
            <p className="human-kicker">VUXION / WEB DEVELOPMENT</p>
            <h1>Simple ideas.<br /><em>Well built.</em></h1>
            <p className="human-hero-copy">
              We design and build useful websites, dashboards, and digital products for people with something real to do.
            </p>
            <div className="human-actions">
              <Link className="studio-button studio-button--accent" href="/contact">
                Tell us about it <Arrow />
              </Link>
              <Link className="studio-text-link" href="/services">
                See what we do <Arrow />
              </Link>
            </div>
          </div>

          {/* Boy — no card, just floating image */}
          <div className="hero-boy-wrap">
            <img
              src="/hero-boy-nobg.png"
              alt="Developer"
              className="hero-boy-img"
              style={{ maskImage: "linear-gradient(to top, transparent 0%, black 18%)", WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 18%)" }}
            />
          </div>

          <div className="human-hero-foot">
            <span>Small team, close to the work</span>
            <span>Websites / Tools / MVPs</span>
          </div>
        </section>

        <section className="human-fit-strip studio-grid-section" aria-label="Explore Vuxion">
          <span className="human-fit-label">EXPLORE VUXION</span>
          <Link href="/services">Services <Arrow /></Link>
          <Link href="/projects">Projects <Arrow /></Link>
          <Link href="/about">About us <Arrow /></Link>
        </section>

        <section className="human-fit-section studio-grid-section">
          <div className="human-fit-section-head">
            <div>
              <span className="studio-label">A GOOD FIT FOR</span>
              <h2>Teams with something <em>worth building.</em></h2>
            </div>
            <p>Whether you are starting from a sketch or improving something already live, we help turn momentum into a product people can use.</p>
          </div>
          <div className="human-fit-grid">
            <article><span>01</span><h3>New ideas</h3><p>Shape an opportunity into a focused, useful first release.</p></article>
            <article><span>02</span><h3>Growing teams</h3><p>Give your business a stronger website, workflow, or customer experience.</p></article>
            <article><span>03</span><h3>Busy operations</h3><p>Replace spreadsheets and repeated manual work with simple internal tools.</p></article>
            <article><span>04</span><h3>Existing products</h3><p>Improve clarity, performance, and the next important feature.</p></article>
          </div>
        </section>

        <section className="human-proof studio-grid-section">
          <div className="human-proof-intro">
            <span className="studio-label">THE VUXION DIFFERENCE</span>
            <h2>Good work should feel <em>clear.</em></h2>
            <p>
              You should always know what is being built, why it matters, and what happens next. We keep the process close, practical, and easy to follow.
            </p>
          </div>
          <div className="human-proof-grid">
            <article className="human-proof-card">
              <strong>01 / CLARITY</strong>
              <h3>Less guesswork.</h3>
              <p>We turn a loose idea into a shared plan with clear priorities, milestones, and decisions.</p>
            </article>
            <article className="human-proof-card">
              <strong>02 / CRAFT</strong>
              <h3>More intention.</h3>
              <p>Every screen, interaction, and line of code has a job: help people move forward with confidence.</p>
            </article>
            <article className="human-proof-card">
              <strong>03 / OWNERSHIP</strong>
              <h3>Ready to grow.</h3>
              <p>You get a fast product today and a foundation your team can understand, maintain, and improve tomorrow.</p>
            </article>
          </div>
        </section>

        <section className="human-visual-section studio-grid-section">
          <div className="human-visual-copy">
            <span className="studio-label">THE WORK IN PRACTICE</span>
            <h2>Ideas become <em>useful things.</em></h2>
            <p>From the first rough sketch to the final responsive screen, we keep the work tangible, focused, and close to the people who will use it.</p>
            <Link href="/projects" className="studio-text-link">See selected work <Arrow /></Link>
          </div>
          <div className="human-visual-grid">
            <figure className="human-visual-feature">
              <Image src="/studio-workspace.png" alt="Desktop and mobile product interfaces in a studio workspace" fill sizes="(max-width: 800px) 100vw, 58vw" />
              <figcaption>01 / BUILT FOR THE REAL WORLD</figcaption>
            </figure>
            <figure className="human-visual-detail">
              <Image src="/studio-process.png" alt="Paper interface sketches and product design materials" fill sizes="(max-width: 800px) 100vw, 30vw" />
              <figcaption>02 / START WITH CLARITY</figcaption>
            </figure>
          </div>
        </section>

        <section className="human-approach studio-grid-section">
          <div className="human-approach-head">
            <div>
              <span className="studio-label">WHAT WE BUILD</span>
              <h2>Useful work,<br /><em>without the noise.</em></h2>
            </div>
            <p>Small, focused digital products that are clear to use, easy to maintain, and ready for the next stage.</p>
          </div>
          <div className="human-approach-grid">
            <article className="human-approach-card">
              <strong>01 / WEBSITES</strong>
              <h3>Make the first impression count.</h3>
              <p>Fast, responsive websites that make your offer easier to understand.</p>
            </article>
            <article className="human-approach-card">
              <strong>02 / INTERNAL TOOLS</strong>
              <h3>Turn daily friction into flow.</h3>
              <p>Dashboards and tools that help teams spend less time working around their software.</p>
            </article>
            <article className="human-approach-card">
              <strong>03 / MVPs</strong>
              <h3>Get a real idea moving.</h3>
              <p>A practical first version that gives you something useful to learn from.</p>
            </article>
          </div>
        </section>

        {/* ── How We Work ────────────────────────────────────────────── */}
        <section className="studio-section studio-grid-section" style={{ borderTop: "1px solid var(--studio-line)" }}>
          <div className="studio-section-head">
            <div>
              <span className="studio-label">OUR PROCESS</span>
              <h2>How we <em>work.</em></h2>
            </div>
            <p>A simple, transparent process so you always know where your project stands and what comes next.</p>
          </div>

          <div className="process-grid">
            {[
              ["01", "Discovery", "We listen first. You walk us through the idea, the users, and the problem you're solving."],
              ["02", "Proposal", "We map out the scope, timeline, and a fixed price — no surprises mid-project."],
              ["03", "Build", "Regular check-ins, live previews, and a short feedback loop so nothing drifts."],
              ["04", "Launch", "We deploy, hand over everything you need, and stay available for questions after go-live."],
            ].map(([num, title, desc]) => (
              <div
                key={num}
                style={{
                  borderRight: "1px solid var(--studio-line)",
                  padding: "28px 24px 28px 0",
                  marginLeft: 24,
                }}
              >
                <span className="studio-mono" style={{ color: "var(--studio-orange)", fontSize: 10 }}>{num}</span>
                <h3 style={{ fontFamily: "var(--studio-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-.05em", color: "var(--studio-copy)", margin: "28px 0 12px" }}>{title}</h3>
                <p style={{ color: "#929297", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pricing Plans ──────────────────────────────────────────────── */}
        <section className="studio-section studio-grid-section" style={{ borderTop: "1px solid var(--studio-line)" }}>
          <div className="studio-section-head">
            <div>
              <span className="studio-label">PRICING</span>
              <h2>Simple, honest <em>plans.</em></h2>
            </div>
            <p>Fixed prices. No hourly billing. No hidden fees. Pick the scope that fits your stage, then let&apos;s talk details.</p>
          </div>

          <div className="pricing-grid">
            <PricingCard
              num="01 / STARTER"
              title="Landing Page"
              desc="A clean, fast marketing page that makes your offer impossible to misread."
              features={["Single-page design", "Mobile responsive", "Contact form", "SEO fundamentals", "2 revision rounds"]}
            />
            <PricingCard
              num="02 / GROWTH"
              title="Full Website"
              desc="Multi-page site with CMS, animations and everything a growing business needs online."
              features={["Up to 8 pages", "CMS integration", "Custom animations", "Analytics setup", "SEO & performance audit", "3 revision rounds"]}
            />
            <PricingCard
              num="03 / PRODUCT"
              title="Web App / MVP"
              desc="A real working product — auth, database, dashboards — built to survive real users."
              features={["Full-stack Next.js", "Auth & user roles", "Database + API", "Admin dashboard", "Deployment + CI/CD", "Ongoing retainer option"]}
            />
          </div>

          <p style={{ color: "#929297", fontSize: 12, marginTop: 20, textAlign: "center" }}>
            All prices are project-based. Final quote after a free 30-min call. No retainer required.
          </p>
        </section>

        {/* ── Contact CTA ────────────────────────────────────────────────── */}
        <section className="human-contact studio-grid-section">
          <div>
            <span className="studio-label">04 / NEXT STEP</span>
            <h2>Have a real project<br /><em>in mind?</em></h2>
          </div>
          <div className="human-contact-copy">
            <p>Tell us what you are trying to make, where you are stuck, or what you want to improve.</p>
            <Link className="studio-button studio-button--accent" href="/contact">Start a conversation <Arrow /></Link>
          </div>
        </section>
      </main>

      <footer className="studio-footer">
        <Link className="studio-mark" href="/">
          <span className="studio-mark-box">V</span>
          <span>VUXION</span>
        </Link>
        <span className="studio-mono">© {new Date().getFullYear()} VUXION STUDIO</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
