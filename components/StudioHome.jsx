"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

function Arrow() {
  return <span aria-hidden="true" className="studio-arrow">↗</span>;
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

          <aside className="human-hero-card" aria-label="Vuxion studio introduction">
            <div className="human-card-top">
              <span>VUXION</span>
              <span>NOIDA / INDIA</span>
            </div>
            <div className="human-card-mark">V</div>
            <div className="human-card-bottom">
              <span>DESIGN<br />&amp; DEVELOPMENT</span>
              <span>2026</span>
            </div>
          </aside>

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
    </div>
  );
}
