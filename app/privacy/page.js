import Link from "next/link";

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
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <div className="relative py-20 px-6 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-white/75 text-base">Last updated: September 2025</p>
          <p className="text-white/75 text-base mt-2">
            At Vuxion, your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-gray-100 dark:border-gray-800 pb-10 last:border-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
              <div className="space-y-3">
                {section.content.map((para, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {para.split("**").map((part, j) =>
                      j % 2 === 1
                        ? <strong key={j} className="text-gray-800 dark:text-gray-200 font-semibold">{part}</strong>
                        : part
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Have questions about our privacy practices?
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition">
            Contact Us →
          </Link>
        </div>
      </div>
    </main>
  );
}
