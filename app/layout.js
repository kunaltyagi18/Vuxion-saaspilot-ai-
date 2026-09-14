import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SITE_URL } from "@/lib/config";

export const metadata = {
  metadataBase: new URL(SITE_URL), // 👈 lib/config.js me SITE_URL set karo — relative OG image URLs isi se resolve hoti hain
  title: {
    default: "Vuxion | Web Development, UI/UX & SEO Services",
    template: "%s | Vuxion", // 👈 future pages "Services | Vuxion" jaisa auto-bana denge
  },
  description:
    "We build fast, scalable web apps with Next.js. Full-stack development, UI/UX design, and SEO — tailored for growth.",
  keywords: [
    "Next.js agency",
    "web development India",
    "SEO optimization",
    "UI UX design",
  ],
  authors: [{ name: "Vuxion" }],
  alternates: {
    canonical: SITE_URL, // duplicate-content signals avoid karne ke liye canonical tag
  },
  openGraph: {
    title: "Vuxion | Web Development, UI/UX & SEO Services",
    description: "We build fast, scalable web apps with Next.js.",
    url: SITE_URL,
    siteName: "Vuxion",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vuxion | Web Development, UI/UX & SEO Services",
    description: "We build fast, scalable web apps with Next.js.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        {/* body background light me white aur dark me dark slate rahega */}
        <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {/* JSON-LD structured data — Google ko batata hai ye ek Organization hai */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Vuxion",
                url: SITE_URL,
                logo: `${SITE_URL}/favicon.ico`,
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+91-74280-XXXXX",
                  contactType: "customer service",
                },
              }),
            }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}