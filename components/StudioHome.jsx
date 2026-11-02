"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const clients = ["MONO", "KITE", "NORTHSTAR", "SABLE", "PULSE", "ORBIT", "HELIOS"];

const services = [
  {
    index: "01",
    type: "PRODUCT / SYSTEMS",
    title: "Digital products that feel inevitable.",
    copy: "From first frame to final interaction, we turn complex product ideas into clear, resilient interfaces.",
    className: "studio-bento--wide",
    preview: "code",
  },
  {
    index: "02",
    type: "PERFORMANCE / BUILD",
    title: "Fast by default.",
    copy: "Lean architecture, purposeful motion, and the kind of performance users notice without thinking about it.",
    className: "studio-bento--tall",
    preview: "gauge",
  },
  {
    index: "03",
    type: "IDENTITY / DIRECTION",
    title: "A sharper point of view.",
    copy: "We build the visual language, voice, and launch surface that makes a good product impossible to miss.",
    className: "studio-bento--standard",
    preview: "layers",
  },
];

const cases = [
  {
    client: "NORTHSTAR / B2B FINTECH",
    title: "A new operating system for revenue teams.",
    result: "+140%",
    metric: "CONVERSION RATE",
    secondary: "0.4s LCP",
    accent: "orange",
  },
  {
    client: "KITE / CLIMATE INFRASTRUCTURE",
    title: "Making invisible infrastructure visible.",
    result: "3.2×",
    metric: "QUALIFIED DEMOS",
    secondary: "−62% BOUNCE RATE",
    accent: "cream",
  },
];

function Arrow({ className = "" }) {
  return <span aria-hidden="true" className={`studio-arrow ${className}`}>↗</span>;
}

function CodePreview() {
  return (
    <div className="preview-code" aria-label="Code preview">
      <div className="preview-windowbar"><span /><span /><span /><em>system.config.ts</em></div>
      <div className="preview-codebody">
        <span className="line-no">01</span><span><b>const</b> system = {'{'}</span>
        <span className="line-no">02</span><span className="indent"><i>intent</i>: <strong>&quot;clarity&quot;</strong>,</span>
        <span className="line-no">03</span><span className="indent"><i>motion</i>: <strong>&quot;purposeful&quot;</strong>,</span>
        <span className="line-no">04</span><span className="indent"><i>speed</i>: <strong>&quot;non-negotiable&quot;</strong>,</span>
        <span className="line-no">05</span><span>{'}'}</span>
      </div>
      <div className="preview-status"><span className="status-dot" /> build passed <span>24ms</span></div>
    </div>
  );
}

function GaugePreview() {
  return (
    <div className="preview-gauge" aria-label="Performance score preview">
      <div className="gauge-ring"><div><strong>98</strong><small>/100</small></div></div>
      <div className="gauge-label"><span>CORE WEB VITALS</span><b>EXCELLENT</b></div>
      <div className="gauge-bars"><i /><i /><i /><i /><i /><i /><i /></div>
    </div>
  );
}

function LayersPreview() {
  return (
    <div className="preview-layers" aria-label="Layered design preview">
      <div className="layer layer-back">TYPE / 01</div>
      <div className="layer layer-mid">FORM / 02</div>
      <div className="layer layer-front"><span>V</span><b>VUXION</b><small>EST. 2026</small></div>
      <div className="layer-crosshair">+</div>
    </div>
  );
}

function ServicePreview({ type }) {
  if (type === "code") return <CodePreview />;
  if (type === "gauge") return <GaugePreview />;
  return <LayersPreview />;
}

function Ticker() {
  return (
    <div className="studio-ticker" aria-label="Selected clients">
      <div className="studio-ticker-track">
        {[...clients, ...clients].map((client, index) => (
          <span key={`${client}-${index}`}><i /> {client}</span>
        ))}
      </div>
    </div>
  );
}

function StudioNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="studio-nav">
      <Link className="studio-mark" href="/" aria-label="Vuxion home">
        <span className="studio-mark-box">V</span><span>VUXION</span>
      </Link>
      <div className={`studio-navlinks ${open ? "is-open" : ""}`}>
        <a href="#services" onClick={() => setOpen(false)}>Capabilities</a>
        <a href="#work" onClick={() => setOpen(false)}>Selected work</a>
        <a href="#about" onClick={() => setOpen(false)}>Approach</a>
      </div>
      <Link className="studio-nav-cta" href="/contact">Start a project <Arrow /></Link>
      <button className="studio-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        <span /><span />
      </button>
    </nav>
  );
}

export default function StudioHome() {
  const [activeCase, setActiveCase] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 24 });

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <div className="studio-shell">
      <StudioNav />

      <main>
        <section className="studio-hero studio-grid-section" onPointerMove={handlePointerMove}>
          <motion.div className="studio-cursor-glow" style={{ left: springX, top: springY }} />
          <div className="studio-hero-meta studio-mono">[ SYS.2026 // NOIDA ]</div>
          <div className="studio-hero-index studio-mono">SCROLL TO EXPLORE <span>↓</span></div>
          <div className="studio-hero-content">
            <p className="studio-eyebrow">Independent digital studio <span>—</span> est. 2018</p>
            <h1>We make<br /><em>digital</em> <span>matter.</span></h1>
            <p className="studio-hero-copy">Strategy, design, and technology for teams building what comes next.</p>
            <div className="studio-hero-actions">
              <Link className="studio-button studio-button--accent" href="/contact">Let&apos;s build <Arrow /></Link>
              <a className="studio-text-link" href="#work">See the work <Arrow /></a>
            </div>
          </div>
          <div className="studio-hero-signal studio-mono"><span className="status-dot" /> accepting a few 2026 partners</div>
          <Ticker />
        </section>

        <section id="services" className="studio-section studio-grid-section studio-services">
          <div className="studio-section-head">
            <div><span className="studio-label">01 / CAPABILITIES</span><h2>Make it <em>meaningful.</em></h2></div>
            <p>We are a small, senior team for ambitious products that need a little more rigor and a lot less noise.</p>
          </div>
          <div className="studio-bento-grid">
            {services.map((service, index) => (
              <motion.article key={service.index} className={`studio-bento ${service.className}`} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                <div className="studio-bento-top"><span className="studio-label">{service.index}</span><span className="studio-label">{service.type}</span></div>
                <div className="studio-bento-copy"><h3>{service.title}</h3><p>{service.copy}</p></div>
                <ServicePreview type={service.preview} />
                <Link href="/services" className="studio-card-link" aria-label={`Explore ${service.type}`}><Arrow /></Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="work" className="studio-section studio-grid-section studio-work">
          <div className="studio-section-head studio-section-head--work">
            <div><span className="studio-label">02 / SELECTED WORK</span><h2>Proof, not <em>promises.</em></h2></div>
            <Link className="studio-text-link" href="/projects">View all projects <Arrow /></Link>
          </div>
          <div className="studio-case-tabs">
            {cases.map((item, index) => <button key={item.client} className={activeCase === index ? "active" : ""} onClick={() => setActiveCase(index)}><span>0{index + 1}</span>{item.client}</button>)}
          </div>
          <motion.article key={activeCase} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }} className={`studio-case studio-case--${cases[activeCase].accent}`}>
            <div className="studio-case-visual">
              <div className="case-visual-top"><span>CASE / {String(activeCase + 1).padStart(2, "0")}</span><span>VIEW SYSTEM ↗</span></div>
              <div className="case-visual-mark">{activeCase === 0 ? "N" : "K"}</div>
              <div className="case-visual-grid" />
              <div className="case-visual-caption">{activeCase === 0 ? "NORTHSTAR / REVENUE OS" : "KITE / CLIMATE INFRA"}</div>
            </div>
            <div className="studio-case-info">
              <span className="studio-label">{cases[activeCase].client}</span>
              <h3>{cases[activeCase].title}</h3>
              <div className="studio-kpis"><div><strong>{cases[activeCase].result}</strong><span>{cases[activeCase].metric}</span></div><div><strong>{cases[activeCase].secondary}</strong><span>AFTER LAUNCH</span></div></div>
              <Link href="/projects" className="studio-button studio-button--outline">Read the case <Arrow /></Link>
            </div>
          </motion.article>
        </section>

        <section id="about" className="studio-statement studio-grid-section">
          <div className="studio-statement-number studio-label">03 / THE STUDIO</div>
          <div className="studio-statement-copy"><h2>Good work is<br /><em>felt</em> before it&apos;s explained.</h2><p>Vuxion is an independent digital studio in Noida. We partner with founders and teams to make complicated things feel simple, useful, and distinctly theirs.</p><Link className="studio-text-link" href="/about">Meet the studio <Arrow /></Link></div>
          <div className="studio-statement-aside studio-mono">DESIGN × ENGINEERING<br />NO SHORTCUTS<br />NO DECORATION</div>
        </section>

        <section className="studio-contact studio-grid-section">
          <span className="studio-label">04 / NEXT MOVE</span><h2>Have something<br /><em>worth making?</em></h2><Link className="studio-button studio-button--accent" href="/contact">Start a conversation <Arrow /></Link><span className="studio-contact-index studio-mono">[ 28.6139° N, 77.2090° E ]</span>
        </section>
      </main>

      <footer className="studio-footer"><Link className="studio-mark" href="/"><span className="studio-mark-box">V</span><span>VUXION</span></Link><span className="studio-mono">© 2026 VUXION STUDIO</span><div><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></footer>
    </div>
  );
}
