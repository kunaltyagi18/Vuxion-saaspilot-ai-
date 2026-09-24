import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Vuxion",
  description: "Read Vuxion's Terms of Service to understand the terms and conditions governing our services and your use of our website.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using Vuxion's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.",
    ],
  },
  {
    title: "2. Our Services",
    content: [
      "Vuxion provides web development, UI/UX design, SEO optimisation, and related digital services. Specific deliverables, timelines, and pricing are agreed upon individually for each project through a separate project agreement or contract.",
    ],
  },
  {
    title: "3. Project Agreements",
    content: [
      "Each project begins with a signed proposal or agreement that outlines scope, deliverables, timeline, and payment terms. These terms of service apply in addition to any project-specific agreements.",
      "**Scope Changes**: Any modifications to the agreed project scope must be requested in writing and may result in revised pricing and timelines.",
      "**Client Responsibilities**: Clients are responsible for providing timely feedback, required assets, and access credentials necessary for project completion.",
    ],
  },
  {
    title: "4. Payment Terms",
    content: [
      "• A 50% deposit is required before project commencement",
      "• The remaining 50% is due upon project completion and before final delivery",
      "• For larger projects, milestone-based payment schedules may be agreed upon",
      "• Invoices not paid within 14 days of issue may incur a late payment fee of 2% per month",
      "• All prices are quoted in Indian Rupees (INR) unless otherwise specified",
    ],
  },
  {
    title: "5. Intellectual Property",
    content: [
      "Upon receipt of full payment, the client receives full ownership of all custom code and design assets created specifically for their project.",
      "Vuxion retains the right to display completed work in our portfolio and marketing materials unless explicitly agreed otherwise.",
      "Third-party libraries, fonts, and assets remain subject to their respective licenses.",
    ],
  },
  {
    title: "6. Revisions & Refunds",
    content: [
      "**Revisions**: Each project includes 3 rounds of revisions during development. Additional revisions may be charged at an hourly rate.",
      "**Refunds**: The deposit is non-refundable once work has commenced. If Vuxion fails to deliver the agreed scope, a pro-rated refund will be issued.",
      "**Disputes**: Any disputes should be raised in writing within 7 days of delivery.",
    ],
  },
  {
    title: "7. Confidentiality",
    content: [
      "Both parties agree to keep confidential any sensitive business information shared during the project. This obligation survives the termination of the project agreement.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    content: [
      "Vuxion's liability is limited to the total fees paid for the specific project. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.",
      "We make no warranty that our services will meet your specific requirements or that the operation of delivered products will be error-free.",
    ],
  },
  {
    title: "9. Termination",
    content: [
      "Either party may terminate the project agreement with 14 days written notice. In such cases, payment is due for all work completed up to the termination date.",
    ],
  },
  {
    title: "10. Governing Law",
    content: [
      "These terms are governed by the laws of India. Any disputes will be resolved in the courts of Noida, Uttar Pradesh, India.",
    ],
  },
  {
    title: "11. Changes to These Terms",
    content: [
      "We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms. We will notify clients of significant changes via email.",
    ],
  },
  {
    title: "12. Contact",
    content: [
      "For questions about these Terms of Service:",
      "• Email: hello@vuxion.com",
      "• Address: Vuxion, Noida, Uttar Pradesh, India",
    ],
  },
];

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <div className="relative py-20 px-6 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Terms of Service</h1>
          <p className="text-white/75 text-base">Last updated: September 2025</p>
          <p className="text-white/75 text-base mt-2">
            Please read these terms carefully before engaging with Vuxion&apos;s services.
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
        <div className="mt-12 p-6 rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Questions about our terms? We&apos;re happy to clarify.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-violet-700 transition">
            Get in Touch →
          </Link>
        </div>
      </div>
    </main>
  );
}
