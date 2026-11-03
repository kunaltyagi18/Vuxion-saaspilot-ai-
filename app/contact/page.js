import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "Contact Us | Vuxion",
  description: "Get in touch with Vuxion — tell us about your project and we'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "var(--studio-bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 72 }}>
        <Contact />
      </div>
      <Chatbot />
      <Footer />
    </main>
  );
}
