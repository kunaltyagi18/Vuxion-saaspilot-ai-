import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Vuxion",
  description: "Read Vuxion's Privacy Policy to understand how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "**Contact Information**: When you fill out our contact form, we collect your name, email address, phone number, and message content.",
      "**Usage Data**: We may collect information on how our website is accessed and used, including your IP address, browser type, pages visited, and time spent.",
      "**Cookies**: We use cookies to improve your browsing experience. You can control cookies through your browser settings.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To respond to your enquiries and project requests",
      "To send project updates and communications you have requested",
      "To improve our website and services based on usage patterns",
      "To comply with legal obligations",
      "We do not sell, rent, or trade your personal information to any third parties.",
    ],
  },
  {
    title: "3. Data Storage & Security",
    content: [
      "Your data is stored securely on MongoDB Atlas with encryption at rest. We implement industry-standard security measures including HTTPS, rate limiting, and regular security audits.",
      "We retain your contact data for a maximum of 2 years, after which it is securely deleted unless required by law.",
    ],
  },
  {
    title: "4. Third-Party Services",
    content: [
      "We use the following third-party services which have their own privacy policies:",
      "• **Clerk** — Authentication and user management",
      "• **MongoDB Atlas** — Database hosting",
      "• **Vercel** — Website hosting and analytics",
      "We encourage you to review their respective privacy policies.",
    ],
  },
  {
    title: "5. Your Rights",
    content: [
      "Under applicable data protection laws, you have the right to:",
      "• Access the personal data we hold about you",
      "• Request correction of inaccurate data",
      "• Request deletion of your personal data",
      "• Withdraw consent at any time",
      "To exercise any of these rights, contact us at hello@vuxion.com",
    ],
  },
  {
    title: "6. Cookies Policy",
    content: [
      "We use essential cookies for website functionality and optional analytics cookies to understand usage patterns. You may disable cookies in your browser settings, though this may affect website functionality.",
    ],
  },
  {
    title: "7. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Continued use of our website after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    title: "8. Contact Us",
    content: [
      "If you have any questions about this Privacy Policy, please contact us:",
      "• Email: hello@vuxion.com",
      "• Address: Vuxion, Noida, Uttar Pradesh, India",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main style={{ background: "var(--studio-bg)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ paddingTop: 72 }}>
        {/* Hero */}
        <section className="studio-page-hero studio-grid-section" style={{ borderBottom: "1px solid var(--studio-line)" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="studio-label" style={{ marginBottom: 22, display: "block" }}>Legal</span>
            <h1
              style={{
                fontFamily: "var(--studio-display)",
                fontSize: "clamp(42px, 6vw, 80px)",
                fontWeight: 600,
                letterSpacing: "-.075em",
                lineHeight: 0.9,
                color: "var(--studio-copy)",
                margin: "0 0 24px",
              }}
            >
              Privacy <em style={{ color: "var(--studio-orange)", fontStyle: "normal" }}>Policy.</em>
            </h1>
            <p style={{ color: "#8c8c92", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Last updated: September 2025 — At Vuxion, your privacy matters. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="studio-section studio-grid-section">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 0 }}>
            {sections.map((section, i) => (
              <div
                key={section.title}
                className="privacy-row"
                style={{
                  borderBottom: "1px solid var(--studio-line)",
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "0 48px",
                  padding: "36px 0",
                }}
              >
                {/* Section number + title */}
                <div>
                  <span className="studio-mono" style={{ color: "var(--studio-orange)", fontSize: 10, display: "block", marginBottom: 10 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--studio-display)",
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: "-.04em",
                      color: "var(--studio-copy)",
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </h2>
                </div>

                {/* Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {section.content.map((para, j) => (
                    <p key={j} style={{ color: "#929297", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                      {para.split("**").map((part, k) =>
                        k % 2 === 1
                          ? <strong key={k} style={{ color: "var(--studio-copy)", fontWeight: 600 }}>{part}</strong>
                          : part
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 64, display: "flex", alignItems: "center", gap: 24 }}>
            <Link href="/contact" className="studio-button studio-button--accent">
              Contact Us <span className="studio-arrow">↗</span>
            </Link>
            <Link href="/" className="studio-text-link" style={{ fontSize: 10 }}>
              Back to Home <span className="studio-arrow">↗</span>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
